"use client";

import { Float, Html, OrbitControls, RoundedBox, Stars, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";

const StackBadge = ({ color, label, position, delay = 0 }) => {
  const badge = useRef(null);

  useFrame(({ clock }) => {
    if (!badge.current) return;

    badge.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.2 + delay) * 0.035;
    badge.current.rotation.y = Math.sin(clock.elapsedTime * 0.8 + delay) * 0.14;
  });

  return (
    <group ref={badge} position={position}>
      <RoundedBox args={[0.64, 0.24, 0.04]} radius={0.055} smoothness={8}>
        <meshStandardMaterial
          color="#0b1728"
          emissive={color}
          emissiveIntensity={0.22}
          metalness={0.35}
          roughness={0.42}
        />
      </RoundedBox>
      <Text
        position={[0, 0, 0.035]}
        fontSize={0.085}
        color="#ecfeff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

const PhoneStack = () => {
  const group = useRef(null);

  useFrame(({ mouse, clock }) => {
    if (!group.current) return;

    group.current.rotation.y +=
      (mouse.x * 0.18 + Math.sin(clock.elapsedTime * 0.32) * 0.08 - group.current.rotation.y) *
      0.04;
    group.current.rotation.x +=
      (-mouse.y * 0.1 + Math.sin(clock.elapsedTime * 0.24) * 0.03 - group.current.rotation.x) *
      0.04;
  });

  return (
    <group ref={group}>
      <Float speed={0.78} rotationIntensity={0.12} floatIntensity={0.18}>
        <group rotation={[0.05, -0.18, 0.04]}>
          <RoundedBox args={[1.32, 2.54, 0.12]} radius={0.12} smoothness={10}>
            <meshStandardMaterial
              color="#0b1220"
              emissive="#0891b2"
              emissiveIntensity={0.18}
              metalness={0.7}
              roughness={0.24}
            />
          </RoundedBox>

          <RoundedBox
            position={[0, 0, 0.075]}
            args={[1.14, 2.28, 0.035]}
            radius={0.08}
            smoothness={8}
          >
            <meshStandardMaterial
              color="#10304c"
              emissive="#0e7490"
              emissiveIntensity={0.28}
              metalness={0.25}
              roughness={0.3}
            />
          </RoundedBox>

          <RoundedBox
            position={[0, 0.82, 0.115]}
            args={[0.82, 0.16, 0.025]}
            radius={0.04}
            smoothness={6}
          >
            <meshStandardMaterial color="#67e8f9" emissive="#22d3ee" emissiveIntensity={0.55} />
          </RoundedBox>
          <RoundedBox
            position={[-0.22, 0.34, 0.115]}
            args={[0.55, 0.34, 0.025]}
            radius={0.055}
            smoothness={6}
          >
            <meshStandardMaterial color="#1e3a5f" emissive="#38bdf8" emissiveIntensity={0.28} />
          </RoundedBox>
          <RoundedBox
            position={[0.27, -0.1, 0.115]}
            args={[0.44, 0.55, 0.025]}
            radius={0.055}
            smoothness={6}
          >
            <meshStandardMaterial color="#134e4a" emissive="#14b8a6" emissiveIntensity={0.3} />
          </RoundedBox>
          <RoundedBox
            position={[-0.18, -0.74, 0.115]}
            args={[0.72, 0.16, 0.025]}
            radius={0.04}
            smoothness={6}
          >
            <meshStandardMaterial color="#312e81" emissive="#818cf8" emissiveIntensity={0.26} />
          </RoundedBox>

          <Text
            position={[0, 0.02, 0.145]}
            fontSize={0.14}
            color="#ecfeff"
            anchorX="center"
            anchorY="middle"
            maxWidth={0.84}
            textAlign="center"
          >
            React Native
          </Text>
        </group>
      </Float>

      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.38}>
        <torusGeometry args={[1.2, 0.01, 12, 120]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.34} />
      </mesh>
      <mesh rotation={[1.15, 0.45, 0.32]} scale={1.52}>
        <torusGeometry args={[1.2, 0.008, 12, 120]} />
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.24} />
      </mesh>

      <StackBadge label="Flutter" color="#38bdf8" position={[-1.35, 0.72, 0.18]} delay={0.1} />
      <StackBadge label="Firebase" color="#f59e0b" position={[1.34, 0.6, 0.12]} delay={0.7} />
      <StackBadge label="Supabase" color="#34d399" position={[-1.2, -0.68, 0.2]} delay={1.15} />
      <StackBadge label="SQLite" color="#818cf8" position={[1.18, -0.72, 0.18]} delay={1.55} />
      <StackBadge label="FCM" color="#f97316" position={[0.98, 1.08, 0.16]} delay={1.9} />

      <mesh position={[0, -1.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.18, 72]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.08} />
      </mesh>
      <mesh position={[0, -1.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.72, 1.18, 72]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.18} />
      </mesh>
    </group>
  );
};

const ThreeScene = () => {
  return (
    <div className="relative h-[16.5rem] w-full overflow-hidden sm:h-[23rem] lg:h-[27rem]">
      <div className="pointer-events-none absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.2),rgba(20,184,166,0.08)_34%,transparent_66%)] blur-sm" />
      <div className="pointer-events-none absolute left-1/2 top-[53%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 bg-cyan-300/10 shadow-[0_0_80px_rgba(34,211,238,0.22)] sm:h-44 sm:w-44" />
      <Canvas
        className="relative z-10"
        camera={{ position: [0, 0.12, 5.7], fov: 38 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense
          fallback={
            <Html center>
              <span className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-xs uppercase tracking-[0.25em] text-cyan-100">
                Loading
              </span>
            </Html>
          }
        >
          <ambientLight intensity={0.92} />
          <directionalLight position={[4, 5, 6]} intensity={1.35} color="#e0f2fe" />
          <pointLight position={[-3, 2, 3]} intensity={1.7} color="#22d3ee" />
          <pointLight position={[3, -2, 2]} intensity={1.2} color="#14b8a6" />
          <Stars radius={50} depth={18} count={420} factor={1.8} fade speed={0.12} />
          <PhoneStack />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.18}
            rotateSpeed={0.2}
            minPolarAngle={Math.PI / 2.75}
            maxPolarAngle={Math.PI / 1.82}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
