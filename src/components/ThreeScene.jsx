"use client";

import { Float, OrbitControls, RoundedBox, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";

const ACCENT = "#ff5b2e";
const NEUTRAL = "#f0eee8";
const SHELL = "#0d0d0f";

const PhoneStack = () => {
  const group = useRef(null);

  useFrame(({ mouse, clock }) => {
    if (!group.current) return;

    group.current.rotation.y +=
      (mouse.x * 0.14 + Math.sin(clock.elapsedTime * 0.25) * 0.06 - group.current.rotation.y) *
      0.04;
    group.current.rotation.x +=
      (-mouse.y * 0.08 + Math.sin(clock.elapsedTime * 0.2) * 0.02 - group.current.rotation.x) *
      0.04;
  });

  return (
    <group ref={group}>
      <Float speed={0.7} rotationIntensity={0.1} floatIntensity={0.16}>
        <group rotation={[0.05, -0.18, 0.04]}>
          <RoundedBox args={[1.32, 2.54, 0.12]} radius={0.12} smoothness={8}>
            <meshStandardMaterial
              color={SHELL}
              emissive={ACCENT}
              emissiveIntensity={0.05}
              metalness={0.7}
              roughness={0.25}
            />
          </RoundedBox>

          <RoundedBox
            position={[0, 0, 0.075]}
            args={[1.14, 2.28, 0.035]}
            radius={0.08}
            smoothness={6}
          >
            <meshStandardMaterial
              color="#151517"
              emissive={ACCENT}
              emissiveIntensity={0.08}
              metalness={0.3}
              roughness={0.3}
            />
          </RoundedBox>

          <RoundedBox
            position={[0, 0.82, 0.115]}
            args={[0.82, 0.16, 0.025]}
            radius={0.04}
            smoothness={5}
          >
            <meshBasicMaterial color={ACCENT} />
          </RoundedBox>
          <RoundedBox
            position={[-0.22, 0.34, 0.115]}
            args={[0.55, 0.34, 0.025]}
            radius={0.055}
            smoothness={5}
          >
            <meshStandardMaterial color={NEUTRAL} emissive={NEUTRAL} emissiveIntensity={0.12} />
          </RoundedBox>
          <RoundedBox
            position={[0.27, -0.1, 0.115]}
            args={[0.44, 0.55, 0.025]}
            radius={0.055}
            smoothness={5}
          >
            <meshStandardMaterial color={NEUTRAL} emissive={NEUTRAL} emissiveIntensity={0.1} />
          </RoundedBox>
          <RoundedBox
            position={[-0.18, -0.74, 0.115]}
            args={[0.72, 0.16, 0.025]}
            radius={0.04}
            smoothness={5}
          >
            <meshStandardMaterial color={NEUTRAL} emissive={NEUTRAL} emissiveIntensity={0.08} />
          </RoundedBox>

          <Text
            position={[0, 0.02, 0.145]}
            fontSize={0.14}
            color={NEUTRAL}
            anchorX="center"
            anchorY="middle"
            maxWidth={0.84}
            textAlign="center"
          >
            React Native
          </Text>
        </group>
      </Float>

      <mesh rotation={[Math.PI / 2, 0.2, 0.1]} scale={1.45}>
        <torusGeometry args={[1.2, 0.008, 12, 120]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.16} />
      </mesh>
    </group>
  );
};

const ThreeScene = () => (
  <div className="relative h-full w-full">
    <Canvas
      camera={{ position: [0, 0.12, 5.7], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[4, 5, 6]} intensity={1.15} color="#f5f3ee" />
        <pointLight position={[-3, 2, 3]} intensity={1} color={ACCENT} />
        <PhoneStack />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.15}
          rotateSpeed={0.2}
          minPolarAngle={Math.PI / 2.75}
          maxPolarAngle={Math.PI / 1.82}
        />
      </Suspense>
    </Canvas>
  </div>
);

export default ThreeScene;
