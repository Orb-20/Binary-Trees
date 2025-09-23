import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'; // CORRECTED IMPORT
import { OrbitControls, Text, Line, Bounds } from '@react-three/drei';
import * as THREE from 'three';

// --- Tree Data for Each Story ---
// Defines the nodes, their labels, values, and positions for each story.
const treeData = {
  BT: {
    nodes: [
      { id: 1, label: 'CEO', position: [0, 2, 0] },
      { id: 2, label: 'Manager', position: [-2, 0, 0] },
      { id: 3, label: 'Manager', position: [2, 0, 0] },
      { id: 4, label: 'Team', position: [-3, -2, 0] },
      { id: 5, label: 'Team', position: [-1, -2, 0] },
    ],
    links: [
      { start: 1, end: 2 },
      { start: 1, end: 3 },
      { start: 2, end: 4 },
      { start: 2, end: 5 },
    ],
  },
  BST: {
    nodes: [
      { id: 1, label: 'CEO', value: 50, position: [0, 2.5, 0] },
      { id: 2, label: 'Manager', value: 30, position: [-2.5, 0.5, 0] },
      { id: 3, label: 'Manager', value: 70, position: [2.5, 0.5, 0] },
      { id: 4, label: 'Team', value: 20, position: [-4, -1.5, 0] },
      { id: 5, label: 'Team', value: 40, position: [-1, -1.5, 0] },
      { id: 6, label: 'Team', value: 80, position: [4, -1.5, 0] },
    ],
    links: [
      { start: 1, end: 2 },
      { start: 1, end: 3 },
      { start: 2, end: 4 },
      { start: 2, end: 5 },
      { start: 3, end: 6 },
    ],
  },
  HEAP: {
     nodes: [
      { id: 1, label: 'CEO', value: 100, position: [0, 2.5, 0] },
      { id: 2, label: 'Manager', value: 80, position: [-2.5, 0.5, 0] },
      { id: 3, label: 'Manager', value: 90, position: [2.5, 0.5, 0] },
      { id: 4, label: 'Team', value: 40, position: [-4, -1.5, 0] },
      { id: 5, label: 'Team', value: 60, position: [-1, -1.5, 0] },
      { id: 6, label: 'Team', value: 70, position: [4, -1.5, 0] },
    ],
    links: [
      { start: 1, end: 2 },
      { start: 1, end: 3 },
      { start: 2, end: 4 },
      { start: 2, end: 5 },
      { start: 3, end: 6 },
    ],
  },
  // Default case if no specific tree is found
  DEFAULT: {
    nodes: [{ id: 1, label: 'Node', position: [0, 0, 0] }],
    links: [],
  },
};

// --- Sub-Components for the 3D Scene ---

// Renders a single node (sphere) and its labels
function Node({ position, label, value }) {
  const ref = useRef();
  // Gentle floating animation for each node
  useFrame(({ clock }) => {
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() + position[0]) * 0.1;
  });

  return (
    <group position={position} ref={ref}>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#0FA683" roughness={0.5} metalness={0.5} />
      </mesh>
      <Text
        position={[0, 0.7, 0]}
        fontSize={0.3}
        color="#032F2F"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      {value !== undefined && (
        <Text
          position={[0, -0.7, 0]}
          fontSize={0.4}
          color="#0B0F13"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {value.toString()}
        </Text>
      )}
    </group>
  );
}

// Renders the entire tree structure
function TreeScene({ type }) {
  const data = useMemo(() => treeData[type] || treeData.DEFAULT, [type]);
  const groupRef = useRef();

  // Gentle rotation animation for the whole tree
  useFrame(({ clock }) => {
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
  });

  // Create a map for quick node position lookup
  const nodeMap = useMemo(() => {
    const map = new Map();
    data.nodes.forEach(node => map.set(node.id, node.position));
    return map;
  }, [data.nodes]);

  return (
    <group ref={groupRef}>
      {/* Render all nodes */}
      {data.nodes.map(node => (
        <Node key={node.id} position={node.position} label={node.label} value={node.value} />
      ))}
      {/* Render all links */}
      {data.links.map((link, index) => {
        const startPos = nodeMap.get(link.start);
        const endPos = nodeMap.get(link.end);
        if (!startPos || !endPos) return null;
        return (
          <Line
            key={index}
            points={[new THREE.Vector3(...startPos), new THREE.Vector3(...endPos)]}
            color="#C6A15B"
            lineWidth={3}
          />
        );
      })}
    </group>
  );
}

// --- Main Export Component ---
export default function StoryTreeAnimation({ treeType }) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      
      {/* This Bounds component automatically fits the camera to the scene */}
      <Bounds fit clip observe margin={1.2}>
        <TreeScene type={treeType} />
      </Bounds>
      
      <OrbitControls makeDefault enableZoom={true} enablePan={true} />
    </Canvas>
  );
}