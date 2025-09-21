import React from "react";
import { motion } from "framer-motion";

const THEORIES = {
  BT: `Binary Tree (BT)\nA Binary Tree is a fundamental tree data structure where each node has at most two children, referred to as the left child and the right child. It's a hierarchical structure used to store data in an organized way.
  \nProperties:
  - Root: The topmost node in the tree.
  - Parent: A node that has child nodes.
  - Child: A node that has a parent node.
  - Leaf: A node with no children.
  - Height: The length of the longest path from the root to a leaf.
  - Depth: The length of the path from the root to a specific node.`,
  BST: `Binary Search Tree (BST)\nA BST is a special type of binary tree where the data is organized in a sorted manner. For any given node:
  - All values in the left subtree are less than the node's value.
  - All values in the right subtree are greater than the node's value.
  - Both the left and right subtrees are also binary search trees.
  \nThis property makes search, insert, and delete operations very efficient, with an average time complexity of O(log n). However, in the worst-case scenario (an unbalanced tree), the complexity can degrade to O(n).`,
  AVL: `AVL Tree\nAn AVL tree is a self-balancing Binary Search Tree. The heights of the two child subtrees of any node differ by at most one. If at any time they differ by more than one, rebalancing is done to restore this property.
  \nThis balancing is achieved through operations called rotations:
  - Left Rotation (LL)
  - Right Rotation (RR)
  - Left-Right Rotation (LR)
  - Right-Left Rotation (RL)
  \nBy keeping the tree balanced, AVL trees guarantee O(log n) time complexity for search, insert, and delete operations, even in the worst case.`,
  RB: `Red-Black Tree\nA Red-Black Tree is another type of self-balancing BST that uses an extra bit of data for each node, representing its color (red or black). By enforcing a set of properties, it ensures that the longest path from the root to any leaf is no more than twice as long as the shortest path.
  \nProperties:
  1. Every node is either red or black.
  2. The root is always black.
  3. There are no two adjacent red nodes (a red node cannot have a red parent or a red child).
  4. Every path from a node to any of its descendant NIL nodes has the same number of black nodes.`,
  HEAP: `Heap\nA Heap is a specialized tree-based data structure that is essentially a nearly complete binary tree. Heaps come in two main types:
  - Max-Heap: The value of each node is greater than or equal to the value of its children. The root node is the largest element.
  - Min-Heap: The value of each node is less than or equal to the value of its children. The root node is the smallest element.
  \nHeaps are commonly used to implement Priority Queues and for algorithms like Heapsort.`,
  TRIES: `Trie (Prefix Tree)\nA Trie is a tree-like data structure that is efficient for storing and retrieving strings. Each node represents a single character, and the path from the root to a node represents a prefix.
  \nAdvantages:
  - Tries can insert and find strings in O(L) time, where L is the length of the string.
  - They are highly effective for applications like autocomplete, spell checkers, and IP routing.`,
};

export default function Theory({ treeType }) {
  const text = THEORIES[treeType] || THEORIES["BT"];
  return (
    <div>
      <h2 className="h1">Theory — {treeType}</h2>
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="theory-content">{text}</div>
      </motion.div>
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <h3 className="small">Key Concepts</h3>
        <ul>
          <li>Properties and Rules</li>
          <li>Operations: search, insert, delete</li>
          <li>Time and Space Complexities</li>
          <li>Use Cases and Edge-Cases</li>
        </ul>
      </motion.div>
    </div>
  );
}