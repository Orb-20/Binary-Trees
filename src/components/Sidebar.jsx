import React from "react";
import { motion } from "framer-motion";

export default function Sidebar({ route, setRoute, setTheme }) {
  const navItems = [
    { name: "Home", route: "home" },
    { name: "Theory", route: "theory" },
    { name: "Story Mode", route: "story" },
    { name: "Algorithm", route: "algorithm" },
    { name: "Visualization", route: "viz" },
    { name: "Quiz", route: "quiz" },
  ];

  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="brand">Binary Trees — DSA Visualizer</div>
      <nav>
        {navItems.map((item, index) => (
          <motion.div
            key={item.route}
            className={`nav-button ${route === item.route ? "active" : ""}`}
            onClick={() => setRoute(item.route)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            {item.name}
          </motion.div>
        ))}
      </nav>
      <motion.div
        className="card"
        style={{ marginTop: 18 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      >
        <div className="small">Theme</div>
        <select className="select" onChange={(e) => setTheme(e.target.value)}>
          <option value="tech-forest">Tech Forest</option>
          <option value="oceanic">Oceanic</option>
        </select>
      </motion.div>
      <div className="footer">
        Made for DSA learning • Use dev server:{" "}
        <span className="small">npm run dev</span>
      </div>
    </motion.aside>
  );
}