import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Theory from "./pages/Theory";
import Algorithm from "./pages/Algorithm";
import StoryMode from "./pages/StoryMode";
import Quiz from "./pages/Quiz";
import TreeViz from "./components/TreeViz";
import { motion } from "framer-motion";

export default function App() {
  const [route, setRoute] = useState("home");
  const [treeType, setTreeType] = useState("BST");

  const componentMap = {
    home: <Home setTreeType={setTreeType} setRoute={setRoute} />,
    theory: <Theory treeType={treeType} />,
    story: <StoryMode treeType={treeType} />,
    algorithm: <Algorithm treeType={treeType} />,
    quiz: <Quiz treeType={treeType} />,
    viz: <TreeViz treeType={treeType} />,
  };

  return (
    <div className="app">
      <Sidebar route={route} setRoute={setRoute} />
      <main className="main">
        <motion.div
          key={route}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {componentMap[route]}
        </motion.div>
      </main>
    </div>
  );
}