import React from 'react'
const THEORIES = {
  BST: `Binary Search Tree (BST)\nA BST is a binary tree where for each node, left subtree values are less than node value and right subtree values are greater. Useful for sorted data, search, insert, delete in average O(log n).`,
  AVL: `AVL Tree\nA self-balancing BST where heights of two child subtrees of any node differ by at most one. Rotations keep tree balanced — guarantees O(log n) operations.`,
  RB: `Red-Black Tree\nA BST with an extra color bit per node (red or black). It enforces properties that ensure the longest path is no more than twice the shortest path, guaranteeing balancing.`
}
export default function Theory({treeType}){
  const text = THEORIES[treeType] || THEORIES['BST']
  return (
    <div>
      <h2 className="h1">Theory — {treeType}</h2>
      <div className="card">
        <div className="theory-content">{text}</div>
      </div>
      <div className="card">
        <h3 className="small">Key Concepts</h3>
        <ul>
          <li>Properties</li>
          <li>Operations: search, insert, delete</li>
          <li>Complexities and edge-cases</li>
        </ul>
      </div>
    </div>
  )
}
