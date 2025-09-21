import React from "react";
import { motion } from "framer-motion";
import ParticleTree3D from "../components/ParticleTree3D";

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

      {/* 2. Main content area (Animation + Options) */}
      <div className="home-main-content">
        {/* Wrapper for vertical alignment and height control */}
        <div className="animation-wrapper">
          <motion.div
            className="animation-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ParticleTree3D />
          </motion.div>
        </div>

        {/* Right Side: Tree Options */}
        <motion.div
          className="options-container"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
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