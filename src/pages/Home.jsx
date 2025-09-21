import React from "react";
import { motion } from "framer-motion";
import ParticleTree3D from "../components/ParticleTree3D";

// A new component for the stylish theory nodes
const TheoryNode = ({ title, children, delay }) => (
  <motion.div
    className="theory-node"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: delay }}
  >
    <div className="theory-node-title">{title}</div>
    <div className="theory-node-content">{children}</div>
  </motion.div>
);

export default function Home({ setTreeType, setRoute }) {
  const options = [
    { name: "Binary Tree", type: "BT", route: "theory" },
    { name: "Binary Search Tree", type: "BST", route: "theory" },
    { name: "Heap", type: "HEAP", route: "theory" },
    { name: "Tries", type: "TRIES", route: "theory" },
  ];

  return (
    <div className="home-page-layout">
      {/* 1. Stylish Title at the top */}
      <motion.h1
        className="home-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        TREES
      </motion.h1>

      {/* 2. Redesigned Theory Section with Node Structure */}
      <div className="home-theory-section">
        <TheoryNode title="Definition" delay={0.2}>
          A tree is a non-linear data structure that represents hierarchical relationships. It consists of nodes connected by edges, forming a parent-child structure.
        </TheoryNode>
        <TheoryNode title="Core Concepts" delay={0.4}>
          The <b>Root</b> is the topmost node. A <b>Leaf</b> is a node with no children. An <b>Edge</b> is the link between a parent and a child.
        </TheoryNode>
        <TheoryNode title="Why Use Trees?" delay={0.6}>
          They provide efficient searching, insertion, and deletion. For balanced trees like AVL or Red-Black, these operations average O(log n) time.
        </TheoryNode>
      </div>


      {/* 3. Main content area (Animation + Options) */}
      <div className="home-main-content">
        {/* Left Side: Animation */}
        <motion.div
          className="animation-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <ParticleTree3D />
        </motion.div>

        {/* Right Side: Tree Options */}
        <motion.div
          className="options-container"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15, delayChildren: 1.0 } },
          }}
        >
          {options.map((opt) => (
            <motion.div
              key={opt.name}
              className="option-item"
              onClick={() => {
                if (opt.type) setTreeType(opt.type);
                setRoute(opt.route);
              }}
              variants={{
                hidden: { x: 50, opacity: 0 },
                visible: { x: 0, opacity: 1 },
              }}
              whileHover={{
                x: -10,
                backgroundColor: "rgba(0, 212, 255, 0.1)",
                borderColor: "rgb(0, 212, 255)",
                transition: { duration: 0.2 },
              }}
            >
              {opt.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}