"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

interface NumberSphereProps {
  number: number
  position: [number, number, number]
  color?: string
  scale?: number
  isAverage?: boolean
}

export function NumberSphere({ number, position, color = "#4f46e5", scale = 1, isAverage = false }: NumberSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)

  // Animate the sphere
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3

      // Pulse effect for the average sphere
      if (isAverage) {
        meshRef.current.scale.x = scale * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
        meshRef.current.scale.y = scale * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
        meshRef.current.scale.z = scale * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
      }
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef} scale={scale} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={hovered ? "#ff9500" : color} roughness={0.5} metalness={0.8} />
      </mesh>

      <Text
        position={[0, -1.5, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Regular.json"
      >
        {isAverage ? `AVG: ${number.toFixed(2)}` : number.toString()}
      </Text>
    </group>
  )
}
