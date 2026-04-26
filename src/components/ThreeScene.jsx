"use client";

import { Float, Html, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const CoreObject = () => {
  const group = useRef(null);
  const mesh = useRef(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.08, 1), []);

  useFrame(({ mouse, clock }) => {
    if (!group.current || !mesh.current) return;

    group.current.rotation.y += (mouse.x * 0.18 - group.current.rotation.y) * 0.035;
    group.current.rotation.x += (-mouse.y * 0.12 - group.current.rotation.x) * 0.035;
    mesh.current.rotation.z = clock.elapsedTime * 0.08;
  });

  return (
    <group ref={group}>
      <Float speed={0.85} rotationIntensity={0.16} floatIntensity={0.24}>
        <mesh ref={mesh} geometry={geometry}>
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#0e7490"
            emissiveIntensity={0.7}
            roughness={0.18}
            metalness={0.82}
            wireframe
          />
        </mesh>
        <mesh scale={0.72}>
          <torusKnotGeometry args={[1, 0.025, 140, 12]} />
          <meshStandardMaterial
            color="#f8fafc"
            emissive="#22d3ee"
            emissiveIntensity={1.3}
            roughness={0.22}
            metalness={0.7}
          />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.58}>
        <torusGeometry args={[1.2, 0.012, 12, 120]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[1.15, 0.55, 0.35]} scale={1.78}>
        <torusGeometry args={[1.2, 0.01, 12, 120]} />
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.34} />
      </mesh>
    </group>
  );
};

const ThreeScene = () => {
  return (
    <div className="relative h-[18rem] w-full overflow-hidden sm:h-[24rem] lg:h-[30rem]">
      <div className="pointer-events-none absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.2),rgba(20,184,166,0.08)_34%,transparent_66%)] blur-sm" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 bg-cyan-300/10 shadow-[0_0_80px_rgba(34,211,238,0.22)] sm:h-48 sm:w-48" />
      <Canvas
        className="relative z-10"
        camera={{ position: [0, 0.25, 5.8], fov: 38 }}
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
          <ambientLight intensity={0.85} />
          <directionalLight position={[4, 5, 6]} intensity={1.4} color="#e0f2fe" />
          <pointLight position={[-3, 2, 3]} intensity={1.8} color="#22d3ee" />
          <pointLight position={[3, -2, 2]} intensity={1.2} color="#14b8a6" />
          <Stars radius={54} depth={24} count={700} factor={2.2} fade speed={0.16} />
          <CoreObject />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.22}
            rotateSpeed={0.22}
            minPolarAngle={Math.PI / 2.7}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
