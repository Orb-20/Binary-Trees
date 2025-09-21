import React from 'react'

const InsertionCode = () => (
  <span className="code-block">
    <span className="keyword">function</span> insert(node, <span className="value">value</span>){`{`}
    {`\n  if(node==null) return new Node(value)`}
    {`\n  if(value < node.value) node.left = insert(node.left, value)`}
    {`\n  else node.right = insert(node.right, value)`}
    {`\n  return node`}
    {`\n}`}
  </span>
);

const SearchCode = () => (
  <span className="code-block">
    <span className="keyword">function</span> search(node, <span className="value">value</span>){`{`}
    {`\n  if(node==null) return false`}
    {`\n  if(node.value==value) return true`}
    {`\n  if(value < node.value) return search(node.left, value)`}
    {`\n  else return search(node.right, value)`}
    {`\n}`}
  </span>
);

export default function Algorithm({treeType}){
  return (
    <div>
      <h2 className="h1">Algorithms — {treeType}</h2>
      <div className="card">
        <h3 className="small">Insertion (BST)</h3>
        <pre className="theory-content"><InsertionCode /></pre>
      </div>
      <div className="card">
        <h3 className="small">Search (BST)</h3>
        <pre className="theory-content"><SearchCode /></pre>
      </div>
      <div className="card">
        <h3 className="small">Notes</h3>
        <p className="info">For AVL and RB, additional steps (rotations, recoloring) are required. See textbooks / online references to implement full balancing logic.</p>
      </div>
    </div>
  )
}