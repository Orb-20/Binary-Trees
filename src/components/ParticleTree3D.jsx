import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// --- GENERATION LOGIC FOR MULTIPLE TREE STRUCTURES ---

const yOffset = 4 / 3.0;
const particlesPerNode = 80;
const particlesPerLink = 15;
const nodeRadius = 0.22;

/**
 * Creates target positions for particles forming 3D spherical nodes and linear links.
 * @param {Array<Object>} nodeCenters - Array of node center definitions {x, y, z, children}.
 * @returns {{nodeTargets: THREE.Vector3[], linkTargets: THREE.Vector3[]}}
 */
function createParticleTargets(nodeCenters) {
  const nodeTargets = [];
  const linkTargets = [];

  // Create spherical particle arrangements for each node using Fibonacci lattice
  nodeCenters.forEach(center => {
    const samples = particlesPerNode;
    const phi = Math.PI * (3.0 - Math.sqrt(5.0)); // Golden angle in radians

    for (let i = 0; i < samples; i++) {
      const y = 1 - (i / (samples - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      nodeTargets.push(new THREE.Vector3(
        center.x + x * nodeRadius,
        center.y + y * nodeRadius,
        center.z + z * nodeRadius
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


// --- EXISTING GENERATORS ---

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
  const nodesToRemove = Math.floor(Math.random() * (2**(levels-1) -1));
  for(let i=0; i < nodesToRemove; i++){
      if(nodeCenters.length > 2**(levels-1)){
          nodeCenters.pop();
      }
  }
  nodeCenters.forEach(node => {
      node.children = node.children.filter(childIndex => childIndex < nodeCenters.length);
  });
  return createParticleTargets(nodeCenters);
}

function generateHeap({ levels = 4, width = 4.5, height = 4 }) {
    return generateCompleteBinaryTree({ levels, width, height });
}

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

function generateGraph({ height = 4 }) {
  const nodeCenters = [
    { x: -2, y: 1.5, z:0, children: [1, 3] }, { x: 0, y: 1.5, z:0, children: [2, 4] },
    { x: 2, y: 1.5, z:0, children: [5] }, { x: -2, y: -0.5, z:0, children: [4] },
    { x: 0, y: -0.5, z:0, children: [5] }, { x: 2, y: -0.5, z:0, children: [] },
  ];
  nodeCenters.forEach(n => { n.y -= yOffset; });
  return createParticleTargets(nodeCenters);
}

// --- NEW GENERATOR FUNCTIONS ---

function generateTernaryTree({ levels = 3, width = 5 }) {
    const nodeCenters = [{ x: 0, y: 1.5, z: 0, children: [1, 2, 3] }];
    let parentIndex = 0;
    while (nodeCenters.length < (3 ** levels - 1) / 2) {
        const parent = nodeCenters[parentIndex];
        const level = Math.floor(Math.log(parentIndex * 2 + 1) / Math.log(3));
        const y = 1.5 - level * 1.5;
        const childrenCount = 3 ** (level + 1);
        const spacing = width / childrenCount;

        for (let i = 0; i < 3; i++) {
            const childIndex = nodeCenters.length;
            const x = parent.x - spacing + i * spacing;
            parent.children.push(childIndex);
            nodeCenters.push({ x, y: y - 1.5, z: 0, children: [] });
        }
        parentIndex++;
    }
    nodeCenters.forEach(n => { n.y -= yOffset; });
    return createParticleTargets(nodeCenters);
}

function generateStarGraph({ count = 8, radius = 2.5 }) {
    const nodeCenters = [{ x: 0, y: 0, z: 0, children: [] }];
    for (let i = 1; i <= count; i++) {
        const angle = (i / count) * Math.PI * 2;
        nodeCenters[0].children.push(i);
        nodeCenters.push({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
            z: 0,
            children: []
        });
    }
    nodeCenters.forEach(n => { n.y -= yOffset; });
    return createParticleTargets(nodeCenters);
}

function generateRingGraph({ count = 10, radius = 2 }) {
    const nodeCenters = [];
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        nodeCenters.push({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
            z: 0,
            children: [(i + 1) % count]
        });
    }
    nodeCenters.forEach(n => { n.y -= yOffset; });
    return createParticleTargets(nodeCenters);
}

function generateGridGraph({ width = 3, height = 3, spacing = 1.5 }) {
    const nodeCenters = [];
    const startX = -((width - 1) * spacing) / 2;
    const startY = ((height - 1) * spacing) / 2;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const children = [];
            const currentIndex = y * width + x;
            if (x < width - 1) children.push(currentIndex + 1);
            if (y < height - 1) children.push(currentIndex + width);
            nodeCenters.push({ x: startX + x * spacing, y: startY - y * spacing, z: 0, children });
        }
    }
    nodeCenters.forEach(n => { n.y -= yOffset; });
    return createParticleTargets(nodeCenters);
}

function generateFibonacciTree(n) {
    if (n <= 1) {
        return [{ x: 0, y: 0, z: 0, children: [] }];
    }
    const leftSubtree = generateFibonacciTree(n - 1);
    const rightSubtree = generateFibonacciTree(n - 2);
    const root = { x: 0, y: 1.5, z: 0, children: [] };

    const offset = 2.5;
    leftSubtree.forEach(node => {
        node.x -= offset / 2;
        node.y -= 1.5;
    });
    rightSubtree.forEach(node => {
        node.x += offset / 2;
        node.y -= 1.5;
    });
    
    if (leftSubtree.length > 0) root.children.push(1);
    if (rightSubtree.length > 0) root.children.push(1 + leftSubtree.length);
    
    return [root, ...leftSubtree, ...rightSubtree];
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
    generateTernaryTree({}),
    generateStarGraph({}),
    generateRingGraph({}),
    generateGridGraph({}),
    createParticleTargets(generateFibonacciTree(5).map(n => ({...n, y: n.y - yOffset}))),
  ], []);

  const totalParticles = useMemo(() => Math.max(...shapes.map(s => s.nodeTargets.length + s.linkTargets.length)), [shapes]);

  const paddedShapes = useMemo(() => {
    return shapes.map(shape => {
      const combinedPos = [...shape.nodeTargets, ...shape.linkTargets];
      const originalNodeCount = shape.nodeTargets.length;
      while (combinedPos.length < totalParticles) {
        combinedPos.push(new THREE.Vector3(0, -100, 0));
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

    const cycleDuration = 7;
    const shapeIndex = Math.floor(t / cycleDuration) % paddedShapes.length;
    const nextShapeIndex = (shapeIndex + 1) % paddedShapes.length;
    const progress = (t % cycleDuration) / cycleDuration;
    const morphT = 0.5 - 0.5 * Math.cos(progress * Math.PI);

    const currentShape = paddedShapes[shapeIndex];
    const nextShape = paddedShapes[nextShapeIndex];

    for (let i = 0; i < totalParticles; i++) {
      const start = currentShape.positions[i];
      const end = nextShape.positions[i];

      dummy.position.lerpVectors(start, end, morphT);

      const s = seedRef.current[i];
      dummy.position.x += Math.sin(t * 1.7 + s) * 0.015;
      dummy.position.y += Math.cos(t * 1.3 + s) * 0.015;
      
      const isNode = i < currentShape.nodeCount || i < nextShape.nodeCount;
      const baseSize = isNode ? size : size * 0.4;

      let scaleFactor = 1.0;
      const isVisibleInCurrent = start.y > -90;
      const isVisibleInNext = end.y > -90;

      if (!isVisibleInCurrent && !isVisibleInNext) {
        scaleFactor = 0;
      }
      
      const isLinkInNextShape = i >= nextShape.nodeCount && isVisibleInNext;

      if (isLinkInNextShape) {
        const particleIndexOnLink = (i - nextShape.nodeCount) % particlesPerLink;
        const normalizedPathPosition = particleIndexOnLink / (particlesPerLink - 1);
        const drawHead = morphT * 1.5;

        if (normalizedPathPosition > drawHead) {
          scaleFactor = 0;
        }
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
  cameraPosition = [0, 0, 8.5],
}) {
  return (
    <div style={{ width: "100%", height: "100%", background }}>
      <Canvas camera={{ position: cameraPosition, fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <ParticleFieldInstanced size={0.035} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.2} mipmapBlur />
        </EffectComposer>
        <OrbitControls enablePan={false} enableZoom={true} target={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}