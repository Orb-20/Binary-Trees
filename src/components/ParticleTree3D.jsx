import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// --- CONFIGURATION ---
const yPositionOffset = -1.0; 
const particlesPerNode = 80;
const particlesPerLink = 45;
const nodeRadius = 0.22;

// --- PARTICLE TARGET GENERATION ---
function createParticleTargets(nodeCenters) {
  const nodeTargets = [];
  const linkTargets = [];

  nodeCenters.forEach(center => {
    const samples = particlesPerNode;
    const phi = Math.PI * (3.0 - Math.sqrt(5.0));
    for (let i = 0; i < samples; i++) {
      const y = 1 - (i / (samples - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      nodeTargets.push(new THREE.Vector3(center.x + x * nodeRadius, center.y + y * nodeRadius, center.z + z * nodeRadius));
    }
  });

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

// --- ALL TREE & GRAPH GENERATORS (Positioned higher) ---
function generatePerfectBinaryTree({ levels = 3, width = 4.5, height = 4.5 }) {
    const nodeCenters = [];
    const top = height * 0.45;
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
            nodeCenters.push({ x, y: y + yPositionOffset, z: 0, children });
            index++;
        }
    }
    return createParticleTargets(nodeCenters);
}

function generateSkewedTree({ levels = 7, height = 4.5 }) {
  const nodeCenters = [];
  const top = height * 0.45;
  for (let level = 0; level < levels; level++) {
    const x = -1.5 + level * 0.5;
    const y = top - level * 0.6;
    const children = level < levels - 1 ? [level + 1] : [];
    nodeCenters.push({ x, y: y + yPositionOffset, z: 0, children });
  }
  return createParticleTargets(nodeCenters);
}

function generateStarGraph({ count = 8, radius = 2.5 }) {
    const nodeCenters = [{ x: 0, y: 0 + yPositionOffset, z: 0, children: [] }];
    for (let i = 1; i <= count; i++) {
        const angle = (i / count) * Math.PI * 2;
        nodeCenters[0].children.push(i);
        nodeCenters.push({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle) + yPositionOffset,
            z: 0,
            children: []
        });
    }
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
            nodeCenters.push({ x: startX + x * spacing, y: startY - y * spacing + yPositionOffset, z: 0, children });
        }
    }
    return createParticleTargets(nodeCenters);
}


// --- ANIMATION COMPONENT ---
function ParticleSystem() {
  const nodeRef = useRef();
  const linkRef = useRef();

  const shapes = useMemo(() => [
    generatePerfectBinaryTree({}),
    generateStarGraph({}),
    generateSkewedTree({}),
    generateGridGraph({}),
  ], []);

  const maxNodes = useMemo(() => Math.max(...shapes.map(s => s.nodeTargets.length)), [shapes]);
  const maxLinks = useMemo(() => Math.max(...shapes.map(s => s.linkTargets.length)), [shapes]);

  const paddedShapes = useMemo(() => {
    const hiddenParticle = new THREE.Vector3(0, -100, 0);
    return shapes.map(shape => {
      const paddedNodeTargets = [...shape.nodeTargets];
      while (paddedNodeTargets.length < maxNodes) paddedNodeTargets.push(hiddenParticle);
      
      const paddedLinkTargets = [...shape.linkTargets];
      while (paddedLinkTargets.length < maxLinks) paddedLinkTargets.push(hiddenParticle);
      
      return { nodeTargets: paddedNodeTargets, linkTargets: paddedLinkTargets };
    });
  }, [shapes, maxNodes, maxLinks]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!nodeRef.current || !linkRef.current) return;
    
    const t = clock.getElapsedTime();
    const cycleDuration = 7;
    const cycleTime = t % cycleDuration;
    const shapeIndex = Math.floor(t / cycleDuration) % shapes.length;
    const nextShapeIndex = (shapeIndex + 1) % shapes.length;
    
    const progress = cycleTime / cycleDuration;
    const morphT = 0.5 - 0.5 * Math.cos(progress * Math.PI);

    const currentShape = paddedShapes[shapeIndex];
    const nextShape = paddedShapes[nextShapeIndex];
    
    // Animate Nodes
    for (let i = 0; i < maxNodes; i++) {
      dummy.position.lerpVectors(currentShape.nodeTargets[i], nextShape.nodeTargets[i], morphT);
      dummy.scale.setScalar(0.035);
      dummy.updateMatrix();
      nodeRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    // Animate Links
    for (let i = 0; i < maxLinks; i++) {
      dummy.position.lerpVectors(currentShape.linkTargets[i], nextShape.linkTargets[i], morphT);
      dummy.scale.setScalar(0.025);
      dummy.updateMatrix();
      linkRef.current.setMatrixAt(i, dummy.matrix);
    }

    nodeRef.current.instanceMatrix.needsUpdate = true;
    linkRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={nodeRef} args={[null, null, maxNodes]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#0FA683" />
      </instancedMesh>
      <instancedMesh ref={linkRef} args={[null, null, maxLinks]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#C6A15B" />
      </instancedMesh>
    </>
  );
}

// --- MAIN CANVAS COMPONENT ---
export default function ParticleTree3D({
  background = "#F8F7F5",
  cameraPosition = [0, 0, 8.5],
}) {
  return (
    <div style={{ width: "100%", height: "100%", background }}>
      <Canvas camera={{ position: cameraPosition, fov: 45 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <ParticleSystem />
        <EffectComposer>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={1.5} mipmapBlur />
        </EffectComposer>
        <OrbitControls enablePan={true} enableZoom={true} target={[0, yPositionOffset, 0]} />
      </Canvas>
    </div>
  );
}