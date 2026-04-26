"use client";

import { Float, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useReducedMotion } from "framer-motion";
import { Suspense, useMemo, useRef } from "react";

const palette = ["#22d3ee", "#38bdf8", "#14b8a6", "#818cf8"];

const SkillNode = ({ item, index, total }) => {
  const angle = (index / total) * Math.PI * 2;
  const layer = index % 3;
  const radius = 1.65 + layer * 0.34;
  const y = [-0.82, 0, 0.82][layer] + Math.sin(index * 1.7) * 0.14;
  const color = palette[index % palette.length];
  const position = [
    Math.cos(angle) * radius,
    y,
    Math.sin(angle) * radius,
  ];

  return (
    <group position={position}>
      <Float speed={0.9 + layer * 0.08} floatIntensity={0.18} rotationIntensity={0.12}>
        <mesh>
          <sphereGeometry args={[0.075, 18, 18]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            roughness={0.25}
            metalness={0.45}
          />
        </mesh>
      </Float>
    </group>
  );
};

const SkillRig = ({ skills, shouldReduceMotion }) => {
  const rig = useRef(null);
  const core = useRef(null);

  useFrame(({ clock }, delta) => {
    if (!rig.current || !core.current || shouldReduceMotion) return;

    rig.current.rotation.y += delta * 0.12;
    rig.current.rotation.x = Math.sin(clock.elapsedTime * 0.28) * 0.045;
    core.current.rotation.x += delta * 0.18;
    core.current.rotation.y -= delta * 0.14;
  });

  return (
    <group ref={rig}>
      <Float speed={0.75} floatIntensity={0.22} rotationIntensity={0.08}>
        <mesh ref={core}>
          <dodecahedronGeometry args={[0.72, 0]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#0891b2"
            emissiveIntensity={0.65}
            roughness={0.18}
            metalness={0.75}
          />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.72, 0.01, 12, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.32} />
      </mesh>
      <mesh rotation={[1.04, 0.55, 0.22]}>
        <torusGeometry args={[2.08, 0.01, 12, 120]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.24} />
      </mesh>
      <mesh rotation={[1.85, -0.42, 0.1]}>
        <torusGeometry args={[2.36, 0.008, 12, 120]} />
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.2} />
      </mesh>

      {skills.map((item, index) => (
        <SkillNode
          key={`${item.group}-${item.skill}`}
          item={item}
          index={index}
          total={skills.length}
        />
      ))}
    </group>
  );
};

const SkillCloud = ({ groups }) => {
  const shouldReduceMotion = useReducedMotion();
  const skills = useMemo(
    () =>
      groups.flatMap((group) =>
        group.skills.map((skill) => ({ skill, group: group.title }))
      ),
    [groups]
  );
  const visibleLabels = skills.slice(0, 12);

  return (
    <div className="relative min-h-[24rem] overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/45 p-4 shadow-soft backdrop-blur-2xl sm:min-h-[30rem] sm:p-6 lg:min-h-[34rem]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(34,211,238,0.2),transparent_32%),radial-gradient(circle_at_78%_72%,rgba(139,92,246,0.13),transparent_28%),linear-gradient(135deg,rgba(20,184,166,0.08),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-8 top-10 h-24 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative h-[22rem] overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/35 sm:h-[28rem] lg:h-[31rem]">
        <Canvas
          camera={{ position: [0, 0.18, 5.45], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.9} />
            <directionalLight position={[3, 5, 4]} intensity={1.35} color="#eff6ff" />
            <pointLight position={[-2.8, 1.4, 3]} intensity={1.2} color="#22d3ee" />
            <pointLight position={[2.4, -1.6, 2.6]} intensity={1} color="#8b5cf6" />
            <Stars radius={46} depth={18} count={420} factor={1.6} fade speed={0.12} />
            <SkillRig skills={skills.slice(0, 18)} shouldReduceMotion={shouldReduceMotion} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={!shouldReduceMotion}
              autoRotateSpeed={0.18}
              rotateSpeed={0.22}
              minPolarAngle={Math.PI / 2.7}
              maxPolarAngle={Math.PI / 1.75}
            />
          </Suspense>
        </Canvas>

        <div className="pointer-events-none absolute inset-0">
          <div className="skill-core-visual" />
          {visibleLabels.map((item, index) => {
            const angle = (index / visibleLabels.length) * Math.PI * 2;
            const x = 50 + Math.cos(angle) * 31;
            const y = 50 + Math.sin(angle) * 28;

            return (
              <span
                key={`${item.group}-${item.skill}-label`}
                className="skill-orbit-label"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  animationDelay: `${index * -0.45}s`,
                }}
              >
                {item.skill}
              </span>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mt-4 grid gap-3 sm:grid-cols-3"
      >
        {groups.slice(0, 3).map((group) => (
          <div
            key={group.title}
            className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100">
              {group.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {group.skills.slice(0, 3).join(" / ")}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillCloud;
