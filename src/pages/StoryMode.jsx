import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import { motion } from 'framer-motion';

const STORIES = {
  BT: `Imagine a company's organization chart. At the very top, you have the CEO, who is the 'root' of the company. The CEO has executives who report directly to them—these are the CEO's 'children'. Each executive, in turn, manages a department of people, who are their children. This continues down until you reach employees who don't manage anyone; these are the 'leaves' of the organizational tree. This entire structure is a perfect real-world example of a tree, organizing complex relationships in a simple, hierarchical way.`,
  BST: `Imagine a library where each shelf splits into two based on the book's title alphabetically. To find "Moby Dick", you start at the front desk (root) and go left for books from A-L and right for M-Z. You repeat this at each shelf, quickly narrowing down your search. That's a BST — organized decisions.`,
  AVL: `Think of an elf stacking books so that neither side of a shelf gets too tall. If one side becomes too high, the elf quickly rearranges the books (rotates the stack) to keep it balanced and prevent it from toppling over. That's an AVL tree, always keeping things tidy.`,
  RB: `Consider a road with traffic lights that can be red or black. There are strict rules, like no two red lights in a row, to ensure that traffic flows smoothly and no single path gets too congested. These rules and colors keep the flow balanced — that's a Red-Black Tree.`,
  HEAP: `Picture a tournament bracket. In a max-heap, the winner of each match (the greater value) moves up to the next round. This continues until the ultimate champion (the maximum value) is at the very top. This structure makes it easy to find the top contender at any time.`,
  TRIES: `Think of the autocomplete feature on your phone. As you start typing a word, it suggests possibilities based on the letters you've entered. A trie works similarly, storing words in a way that makes it incredibly fast to find all words with a specific prefix.`
};

const ANIMATIONS = {
  BT: "/animations/bt.json",
  BST: "/animations/bst.json",
  AVL: "/animations/avl.json",
  RB: "/animations/rb.json",
  HEAP: "/animations/heap.json",
  TRIES: "/animations/tries.json",
};

export default function StoryMode({treeType}){
  const [animationData, setAnimationData] = useState(null);
  const story = STORIES[treeType] || STORIES['BT'];
  const animationUrl = ANIMATIONS[treeType] || ANIMATIONS['BT'];
  const title = treeType === 'BT' ? 'What is a Tree?' : `Story Mode — ${treeType}`;

  useEffect(() => {
    setAnimationData(null); 
    
    fetch(animationUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setAnimationData(data))
      .catch(error => console.error("Error fetching Lottie animation:", error));
      
  }, [animationUrl]);

  return (
    <div>
      <h2 className="h1">{title}</h2>
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="story-container">
          <div className="story-text theory-content">{story}</div>
          <motion.div 
            className="story-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {animationData ? (
              <Lottie animationData={animationData} loop={true} />
            ) : (
              <div className="loading-placeholder">Loading Animation...</div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}