import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// --- GENERATION LOGIC FOR MULTIPLE TREE STRUCTURES ---

const yOffset = 4 / 3.0;
const particlesPerNode = 7;
const particlesPerLink = 10;
const nodeRadius = 0.15;

/**
 * Creates target positions for particles forming nodes and links.
 * @param {Array<Object>} nodeCenters - Array of node center definitions {x, y, z, children}.
 * @returns {{nodeTargets: THREE.Vector3[], linkTargets: THREE.Vector3[]}}
 */
function createParticleTargets(nodeCenters) {
  const nodeTargets = [];
  const linkTargets = [];

  // Create circular particle arrangements for each node
  nodeCenters.forEach(center => {
    for (let i = 0; i < particlesPerNode; i++) {
      const angle = (i / particlesPerNode) * Math.PI * 2;
      nodeTargets.push(new THREE.Vector3(
        center.x + nodeRadius * Math.cos(angle),
        center.y + nodeRadius * Math.sin(angle),
        center.z
      ));
    }
  });

  // Create linear particle arrangements for links between nodes
  for (let i = 0; i < nodeCenters.length; i++) {
    if (!nodeCenters[i].children) continue;
    const parent = nodeCenters[i];
    nodeCenters[i].children.forEach(childIndex => {
      if (childIndex < nodeCenters.length) {
        const child = nodeCenters[childIndex];
        for (let j = 0; j < particlesPerLink; j++) {
          linkTargets.push(new THREE.Vector3().lerpVectors(parent, child, j / (particlesPerLink - 1)));
        }
      }
    });
  }
  return { nodeTargets, linkTargets };
}

/**
 * Generates node positions for a Perfect Binary Tree.
 * In a perfect binary tree, all interior nodes have two children and all leaves are at the same depth.
 */
function generatePerfectBinaryTree({ levels = 3, width = 4.5, height = 4 }) {
    const nodeCenters = [];
    const top = height * 0.25;
    let index = 0;
    for (let level = 0; level < levels; level++) {
        const nodesInLevel = 2 ** level;
        const y = top - (level / (levels - 1)) * (height * 0.9);
        const spacing = (width * 0.9) / nodesInLevel;
        for (let i = 0; i < nodesInLevel; i++) {
            const x = -width * 0.45 + spacing / 2 + i * spacing;
            const children = [];
            if (level < levels - 1) {
                const leftChild = index + nodesInLevel - i + (i*2) + 1;
                children.push(leftChild, leftChild + 1);
            }
            nodeCenters.push({ x, y: y - yOffset, z: 0, children });
            index++;
        }
    }
    return createParticleTargets(nodeCenters);
}


/**
 * Generates node positions for a Complete Binary Tree.
 * Every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible.
 */
function generateCompleteBinaryTree({ levels = 4, width = 4.5, height = 4 }) {
  const nodeCenters = [];
  const top = height * 0.25;
  for (let level = 0; level < levels; level++) {
    const nodesInLevel = 2 ** level;
    const y = top - (level / (levels - 1)) * (height * 0.9);
    const spacing = (width * 0.9) / nodesInLevel;
    for (let i = 0; i < nodesInLevel; i++) {
      const x = -width * 0.45 + spacing / 2 + i * spacing;
      const children = [];
      const currentIndex = nodeCenters.length;
      const firstChildIndex = 2 * currentIndex + 1;
      if (firstChildIndex < (2**levels -1) ) {
          children.push(firstChildIndex, firstChildIndex + 1);
      }
      nodeCenters.push({ x, y: y - yOffset, z: 0, children });
    }
  }
  // This makes it "complete" by removing some right-side leaf nodes
  const nodesToRemove = Math.floor(Math.random() * (2**(levels-1) -1));
  for(let i=0; i < nodesToRemove; i++){
      if(nodeCenters.length > 2**(levels-1)){
          nodeCenters.pop();
      }
  }
  // Clean up children references
  nodeCenters.forEach(node => {
      node.children = node.children.filter(childIndex => childIndex < nodeCenters.length);
  });

  return createParticleTargets(nodeCenters);
}

/**
 * Generates node positions for a Heap.
 * Structurally, a Heap is a complete binary tree.
 */
function generateHeap({ levels = 4, width = 4.5, height = 4 }) {
    // A heap's structure is a complete binary tree. We can reuse the same generator.
    return generateCompleteBinaryTree({ levels, width, height });
}


/**
 * Generates node positions for a Trie (Prefix Tree).
 */
function generateTrie({ height = 4 }) {
  const nodeCenters = [
    { x: 0, y: 1.8, z:0, children: [1, 2, 3] }, { x: -2.0, y: 0.6, z:0, children: [4, 5] },
    { x: 0, y: 0.6, z:0, children: [6] }, { x: 2.0, y: 0.6, z:0, children: [7, 8] },
    { x: -2.5, y: -0.6, z:0, children: [] }, { x: -1.5, y: -0.6, z:0, children: [] },
    { x: 0, y: -0.6, z:0, children: [9] }, { x: 1.5, y: -0.6, z:0, children: [] },
    { x: 2.5, y: -0.6, z:0, children: [] }, { x: 0, y: -1.8, z:0, children: [] },
  ];
  nodeCenters.forEach(n => { n.y -= yOffset; });
  return createParticleTargets(nodeCenters);
}

/**
 * Generates node positions for a Skewed Binary Tree.
 */
function generateSkewedTree({ levels = 7, height = 4 }) {
  const nodeCenters = [];
  const top = 1.1 * (height * 0.25);
  for (let level = 0; level < levels; level++) {
    const x = -1.5 + level * 0.5;
    const y = top - level * 0.45;
    const children = level < levels - 1 ? [level + 1] : [];
    nodeCenters.push({ x, y: y - yOffset, z: 0, children });
  }
  return createParticleTargets(nodeCenters);
}

/**
 * Generates node positions for a generic Graph.
 */
function generateGraph({ height = 4 }) {
  const nodeCenters = [
    { x: -2, y: 1.5, z:0, children: [1, 3] }, { x: 0, y: 1.5, z:0, children: [2, 4] },
    { x: 2, y: 1.5, z:0, children: [5] }, { x: -2, y: -0.5, z:0, children: [4] },
    { x: 0, y: -0.5, z:0, children: [5] }, { x: 2, y: -0.5, z:0, children: [] },
  ];
  nodeCenters.forEach(n => { n.y -= yOffset; });
  return createParticleTargets(nodeCenters);
}


/**
 * The main component that renders and animates the particle field.
 */
function ParticleFieldInstanced({ size = 0.03 }) {
  const meshRef = useRef();

  const shapes = useMemo(() => [
    generatePerfectBinaryTree({}),
    generateCompleteBinaryTree({}),
    generateHeap({}),
    generateTrie({}),
    generateSkewedTree({}),
    generateGraph({}),
  ], []);

  const totalParticles = useMemo(() => Math.max(...shapes.map(s => s.nodeTargets.length + s.linkTargets.length)), [shapes]);

  const paddedShapes = useMemo(() => {
    return shapes.map(shape => {
      const combinedPos = [...shape.nodeTargets, ...shape.linkTargets];
      const originalNodeCount = shape.nodeTargets.length;
      // Pad with "invisible" particles to ensure all arrays have the same length for smooth transition
      while (combinedPos.length < totalParticles) {
        combinedPos.push(new THREE.Vector3(0, -100, 0)); // Positioned off-screen
      }
      return { positions: combinedPos, nodeCount: originalNodeCount };
    });
  }, [shapes, totalParticles]);

  const seedRef = useRef(new Float32Array(totalParticles));
  useEffect(() => {
    for (let i = 0; i < totalParticles; i++) seedRef.current[i] = Math.random() * 1000;
  }, [totalParticles]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    const cycleDuration = 7; // Time in seconds for each shape transition
    const shapeIndex = Math.floor(t / cycleDuration) % paddedShapes.length;
    const nextShapeIndex = (shapeIndex + 1) % paddedShapes.length;
    const progress = (t % cycleDuration) / cycleDuration;
    const morphT = 0.5 - 0.5 * Math.cos(progress * Math.PI); // Eased progress

    const currentShape = paddedShapes[shapeIndex];
    const nextShape = paddedShapes[nextShapeIndex];

    for (let i = 0; i < totalParticles; i++) {
      const start = currentShape.positions[i];
      const end = nextShape.positions[i];

      // Interpolate position between current and next shape
      dummy.position.lerpVectors(start, end, morphT);

      // Add a slight "wobble" effect to particles
      const s = seedRef.current[i];
      dummy.position.x += Math.sin(t * 1.7 + s) * 0.015;
      dummy.position.y += Math.cos(t * 1.3 + s) * 0.015;

      // Differentiate size for nodes vs. links
      const isNode = i < currentShape.nodeCount || i < nextShape.nodeCount;
      const baseSize = isNode ? size : size * 0.5;

      let scaleFactor = 1.0;
      const isVisibleInCurrent = start.y > -90;
      const isVisibleInNext = end.y > -90;

      // Hide particles that are used for padding in both shapes
      if (!isVisibleInCurrent && !isVisibleInNext) {
        scaleFactor = 0;
      }

      dummy.scale.set(baseSize * scaleFactor, baseSize * scaleFactor, baseSize * scaleFactor);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: new THREE.Color(0x00d4ff) }), []);

  return (
    <instancedMesh ref={meshRef} args={[null, null, totalParticles]}>
      <sphereGeometry args={[1, 8, 8]} />
      <primitive object={material} attach="material" />
    </instancedMesh>
  );
}

/**
 * Main App component to set up the scene.
 */
export default function ParticleTree3D({
  background = "#05060a",
  cameraPosition = [0, -0.5, 7.0],
}) {
  return (
    <div style={{ width: "100%", height: "100vh", background }}>
      <Canvas camera={{ position: cameraPosition, fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <ParticleFieldInstanced size={0.035} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.2} mipmapBlur />
        </EffectComposer>
        <OrbitControls enablePan={false} enableZoom={true} target={[0, -0.5, 0]} />
      </Canvas>
    </div>
  );
}
