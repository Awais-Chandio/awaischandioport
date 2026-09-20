"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial, Points, useCursor } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import DraftMarker from "@/components/ui/DraftMarker";
import { interests } from "@/data/interests";
import { swap } from "@/lib/motion";

/**
 * The orb scene. This file is the only place three.js, react-three-fiber,
 * drei and postprocessing are imported for this feature, and it is only ever
 * reached through a dynamic import (BeyondStage.jsx), so none of it is in any
 * other page's bundle and none of it runs until the panel is opened and the
 * visitor has not asked for reduced motion.
 *
 * Four orbs, one per entry in data/interests.js, matched by index. Each drifts
 * on its own slow sine paths — no orbit, no physics, nothing that moves faster
 * than a slow breath. Colours come from the site's own tokens (the accent and
 * the warm off-white ink), read from the stage element so nothing is invented.
 */

// One entry per orb. `x`/`y` are where its drift is centred, as a fraction of
// half the visible width/height, so the arrangement follows the panel's shape.
// `size` is a radius in scene units at the reference viewport. `sx`/`sy`/`sz`
// are angular speeds (radians per second — all well under 0.4, i.e. a full
// cycle takes 15 s or more) and `ax`/`ay` how far it wanders. Phases are
// different per orb so they never move in step. `tint` blends the accent
// toward the ink colour: 0 is pure accent, 1 is pure ink.
const ORBS = [
  { x: -0.5, y: 0.38, size: 0.36, ax: 0.22, ay: 0.16, sx: 0.21, sy: 0.17, sz: 0.13, phase: 0.0, tint: 0.0 },
  { x: 0.46, y: 0.5, size: 0.28, ax: 0.18, ay: 0.2, sx: 0.16, sy: 0.24, sz: 0.11, phase: 2.1, tint: 0.55 },
  { x: -0.34, y: -0.34, size: 0.3, ax: 0.2, ay: 0.14, sx: 0.19, sy: 0.14, sz: 0.15, phase: 4.2, tint: 0.35 },
  { x: 0.52, y: -0.22, size: 0.4, ax: 0.16, ay: 0.18, sx: 0.13, sy: 0.2, sz: 0.1, phase: 5.6, tint: 0.0 },
];

// The reference viewport height at the camera distance below. Orb sizes are
// multiplied by how the real viewport compares, within limits, so they stay
// proportionate from a phone to a wide window.
const REFERENCE = 5.6;

// A deterministic generator: the sky must be the same on every open, and a
// plain Math.random() would also differ between React's double-invoked memos.
const seeded = (seed) => {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const scatter = (count, seed) => {
  const random = seeded(seed);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (random() - 0.5) * 30;
    positions[i * 3 + 1] = (random() - 0.5) * 20;
    positions[i * 3 + 2] = -2 - random() * 9;
  }
  return positions;
};

// Low density on purpose: this is a few stars, not a nebula. Two layers give
// the dim majority and a handful of brighter ones without a per-point size
// attribute.
const Starfield = ({ ink }) => {
  const dim = useMemo(() => scatter(190, 11), []);
  const bright = useMemo(() => scatter(34, 29), []);

  return (
    <>
      <Points positions={dim} stride={3} frustumCulled={false}>
        <PointMaterial color={ink} size={0.045} sizeAttenuation transparent opacity={0.4} depthWrite={false} toneMapped={false} />
      </Points>
      <Points positions={bright} stride={3} frustumCulled={false}>
        <PointMaterial color={ink} size={0.08} sizeAttenuation transparent opacity={0.75} depthWrite={false} toneMapped={false} />
      </Points>
    </>
  );
};

// A soft round falloff used for each orb's halo. Drawn once to a tiny canvas;
// the sprite tints it, so a single texture serves all four.
const makeGlowTexture = () => {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.18, "rgba(255,255,255,0.7)");
  gradient.addColorStop(0.45, "rgba(255,255,255,0.22)");
  gradient.addColorStop(0.75, "rgba(255,255,255,0.05)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const Orb = ({ config, color, glow, active, onHover, onToggle }) => {
  const group = useRef();
  const core = useRef();
  const halo = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const { viewport } = useThree();
  const unit = THREE.MathUtils.clamp(Math.min(viewport.width, viewport.height * 1.15) / REFERENCE, 0.7, 1.25);
  const radius = config.size * unit;

  // Smoothed 0..1 "lit" amount, so a hover or tap eases in rather than snaps.
  const lit = useRef(0);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime + config.phase * 7;
    const baseX = config.x * viewport.width * 0.5 * 0.86;
    // The caption card sits along the bottom, so the whole field rides a little
    // above centre.
    const baseY = (config.y * 0.86 + 0.08) * viewport.height * 0.5;

    group.current.position.set(
      baseX + Math.sin(t * config.sx + config.phase) * config.ax * unit,
      baseY + Math.cos(t * config.sy + config.phase * 1.7) * config.ay * unit,
      Math.sin(t * config.sz + config.phase * 0.6) * 0.3
    );

    lit.current = THREE.MathUtils.damp(lit.current, active ? 1 : 0, 6, delta);
    const scale = 1 + lit.current * 0.22;
    core.current.scale.setScalar(scale);
    core.current.material.color.copy(color).multiplyScalar(1.35 + lit.current * 1.2);
    halo.current.scale.setScalar(radius * (4.6 + lit.current * 1.2));
    halo.current.material.opacity = 0.42 + lit.current * 0.3;
  });

  return (
    <group ref={group}>
      <sprite ref={halo}>
        <spriteMaterial map={glow} color={color} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </sprite>
      <mesh ref={core}>
        <sphereGeometry args={[radius * 0.34, 32, 32]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {/* An invisible, larger sphere is the target for the pointer: a 0.2-unit
          orb is a few dozen pixels on a phone, well under a comfortable tap. */}
      <mesh
        onPointerOver={(event) => {
          // Touch has no hover; a tap must not also count as "hovering", or the
          // caption would flash on touch-down and vanish on lift.
          if (event.nativeEvent.pointerType === "touch") return;
          event.stopPropagation();
          setHovered(true);
          onHover(true);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(false);
        }}
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
      >
        <sphereGeometry args={[Math.max(radius * 1.9, 0.5), 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
};

// Reads the accent and ink from the stage element's own custom properties, so
// the scene stays on the site's palette and follows it if the tokens change.
const readTokens = (element) => {
  const styles = getComputedStyle(element);
  const token = (name) => {
    const [r, g, b] = styles.getPropertyValue(name).trim().split(/\s+/).map(Number);
    return new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
  };
  return { accent: token("--accent"), ink: token("--fg"), canvas: token("--canvas") };
};

const Scene = ({ tokens, activeId, onHover, onToggle }) => {
  const glow = useMemo(makeGlowTexture, []);
  useEffect(() => () => glow.dispose(), [glow]);

  const colors = useMemo(
    () => ORBS.map((orb) => tokens.accent.clone().lerp(tokens.ink, orb.tint)),
    [tokens]
  );

  return (
    <>
      <color attach="background" args={[tokens.canvas]} />
      <Starfield ink={tokens.ink} />
      {ORBS.map((config, index) => (
        <Orb
          key={interests[index].id}
          config={config}
          color={colors[index]}
          glow={glow}
          active={activeId === interests[index].id}
          onHover={(isOver) => onHover(isOver ? interests[index].id : null)}
          onToggle={() => onToggle(interests[index].id)}
        />
      ))}
      {/* The threshold sits above anything a star can reach (their colour is at
          most ink at 75% opacity), so only the orbs, whose colours are pushed
          past 1, bloom. */}
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.85} luminanceThreshold={0.9} luminanceSmoothing={0.25} mipmapBlur radius={0.75} />
      </EffectComposer>
    </>
  );
};

const HINT_CLASS = "text-sm leading-6 text-fg-dim";

const BeyondScene = () => {
  const stage = useRef(null);
  const pointerType = useRef("mouse");
  const [tokens, setTokens] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [focusedId, setFocusedId] = useState(null);

  // Layout effect so the first frame already has the right colours; there is no
  // flash of a default-coloured scene.
  useLayoutEffect(() => {
    setTokens(readTokens(stage.current));
  }, []);

  // A mouse hovers and never pins; touch and pen have no hover, so a tap
  // toggles. The pointer type is recorded on the way down because the `click`
  // that follows carries none.
  const handleToggle = (id) => {
    if (pointerType.current === "mouse") return;
    setSelectedId((current) => (current === id ? null : id));
  };

  const activeId = hoveredId ?? focusedId ?? selectedId;
  const active = interests.find((interest) => interest.id === activeId);

  return (
    <div
      ref={stage}
      onPointerDownCapture={(event) => {
        pointerType.current = event.pointerType;
      }}
      className="night-scope relative h-[min(30rem,62dvh)] min-h-[22rem] overflow-hidden rounded-[28px] border border-line/10 bg-canvas"
    >
      {tokens ? (
        <Canvas
          aria-hidden="true"
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: "low-power" }}
          onPointerMissed={() => setSelectedId(null)}
        >
          <Scene tokens={tokens} activeId={activeId} onHover={setHoveredId} onToggle={handleToggle} />
        </Canvas>
      ) : null}

      {/* A soft edge so the sky sits inside the panel rather than being cut out
          of it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_55%,rgb(var(--canvas)/0.75))]"
      />

      {/* The canvas is not readable or focusable, so these are the way in for
          keyboard and screen-reader visitors: real buttons, invisible until
          focused, each of which lights its orb and shows its caption. They ignore
          the pointer so they never sit over an orb. */}
      <div className="pointer-events-none absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-2">
        {interests.map((interest) => (
          <button
            key={interest.id}
            type="button"
            aria-label={`${interest.label}. ${interest.caption}`}
            onFocus={() => setFocusedId(interest.id)}
            // Deferred a tick: clearing the caption mid-blur mutates the DOM while
            // focus is between two buttons, and the dialog's focus trap reads that
            // as focus having been lost and pulls it back to the panel.
            onBlur={() => setTimeout(() => setFocusedId((current) => (current === interest.id ? null : current)), 0)}
            className="rounded-full border border-accent/50 bg-canvas/85 px-3 py-1.5 text-xs font-semibold text-fg opacity-0 outline-none transition-opacity duration-200 focus-visible:opacity-100"
          >
            {interest.label}
          </button>
        ))}
      </div>

      {/* The label and caption for whichever orb is lit. It is a fixed card at the
          foot of the stage, not a tooltip pinned to a drifting orb, so it can
          never clip at an edge or chase a moving target on a small screen. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 bottom-3 flex min-h-[5.5rem] items-center rounded-2xl border border-line/10 bg-canvas/70 px-4 py-3 backdrop-blur-md sm:inset-x-4 sm:bottom-4"
      >
        {/* No AnimatePresence here: a mode="wait" swap can be left half-finished
            by taps arriving faster than its exit, and the caption would stick.
            Keying the block replays a plain fade-in instead. */}
        {active ? (
          <motion.div key={active.id} variants={swap} initial="hidden" animate="visible" className="min-w-0">
            <p className="font-display text-base font-medium text-fg">{active.label}</p>
            <p className="mt-1 text-sm leading-6 text-fg-muted">{active.caption}</p>
            {active.status === "placeholder" ? <DraftMarker className="mt-2" /> : null}
          </motion.div>
        ) : (
          <motion.p key="hint" variants={swap} initial="hidden" animate="visible" className={HINT_CLASS}>
            <span className="hidden [@media(hover:hover)]:inline">Hover an orb to see what it is.</span>
            <span className="[@media(hover:hover)]:hidden">Tap an orb to see what it is.</span>
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default BeyondScene;
