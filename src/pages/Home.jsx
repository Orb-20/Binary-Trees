import React from "react";
import { motion } from "framer-motion";

export default function Home({ setTreeType, setRoute }) {
  return (
    <div>
      <h2 className="h1">Choose a tree to learn</h2>
      <div className="row" style={{ marginBottom: 12 }}>
        <select className="select" onChange={(e) => setTreeType(e.target.value)}>
          <option value="BST">Binary Search Tree (BST)</option>
          <option value="AVL">AVL Tree</option>
          <option value="RB">Red-Black Tree</option>
        </select>
        <button className="btn" onClick={() => setRoute("theory")}>
          Start Learning
        </button>
      </div>
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h3 className="small">Quick Actions</h3>
        <div style={{ marginTop: 8 }}>
          <button className="btn" onClick={() => setRoute("viz")}>
            Open Visualization
          </button>
        </div>
      </motion.div>
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <h3 className="small">About</h3>
        <p className="info">
          This lightweight app gives conceptual theory, story-mode explanations,
          algorithms, interactive D3 visualizations and a small quiz to test
          knowledge.
        </p>
      </motion.div>
    </div>
  );
}