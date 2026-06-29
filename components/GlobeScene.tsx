"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

const COUNTRY_COORDS: Record<string, [number, number]> = {
  NG: [9.082, 8.6753],
  GB: [55.3781, -3.436],
  US: [37.0902, -95.7129],
  CA: [56.1304, -106.3468],
  IN: [20.5937, 78.9629],
};

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
    }
  });

  const connections = useMemo(() => {
    const ng = latLngToVector3(...COUNTRY_COORDS.NG, 2.02);
    return (["GB", "US", "CA", "IN"] as const).map((code) => ({
      from: ng,
      to: latLngToVector3(...COUNTRY_COORDS[code], 2.02),
    }));
  }, []);

  return (
    <group>
      {/* Soft outer glow */}
      <mesh>
        <sphereGeometry args={[2.12, 32, 32]} />
        <meshBasicMaterial
          color="#2D7DD2"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Wireframe shell — light electric blue */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 48, 48]} />
        <meshStandardMaterial
          color="#7EC8F5"
          emissive="#2D7DD2"
          emissiveIntensity={0.35}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Inner fill — frosted light blue */}
      <mesh>
        <sphereGeometry args={[1.97, 64, 64]} />
        <meshStandardMaterial
          color="#B8DCFF"
          emissive="#2D7DD2"
          emissiveIntensity={0.15}
          transparent
          opacity={0.18}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {connections.map((conn, i) => (
        <Line
          key={i}
          points={[conn.from, conn.to]}
          color="#5BB5FF"
          lineWidth={2}
          transparent
          opacity={0.9}
        />
      ))}

      {Object.entries(COUNTRY_COORDS).map(([code, [lat, lng]]) => {
        const pos = latLngToVector3(lat, lng, 2.05);
        return (
          <group key={code} position={pos}>
            <mesh>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshBasicMaterial color="#2D7DD2" transparent opacity={0.25} />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.04, 10, 10]} />
              <meshStandardMaterial
                color="#FFFFFF"
                emissive="#06D6A0"
                emissiveIntensity={1.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.9} color="#E8F4FF" />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FFFFFF" />
      <pointLight position={[8, 6, 8]} intensity={1.5} color="#5BB5FF" />
      <pointLight position={[-6, -4, 4]} intensity={0.8} color="#06D6A0" />
      <Globe />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
}
