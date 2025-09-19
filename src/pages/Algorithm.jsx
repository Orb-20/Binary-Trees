import React from 'react'
export default function Algorithm({treeType}){
  return (
    <div>
      <h2 className="h1">Algorithms — {treeType}</h2>
      <div className="card">
        <h3 className="small">Insertion (BST)</h3>
        <pre className="theory-content">{`function insert(node, value){
  if(node==null) return new Node(value)
  if(value < node.value) node.left = insert(node.left, value)
  else node.right = insert(node.right, value)
  return node
}`}</pre>
      </div>
      <div className="card">
        <h3 className="small">Search (BST)</h3>
        <pre className="theory-content">{`function search(node, value){
  if(node==null) return false
  if(node.value==value) return true
  if(value < node.value) return search(node.left, value)
  else return search(node.right, value)
}`}</pre>
      </div>
      <div className="card">
        <h3 className="small">Notes</h3>
        <p className="info">For AVL and RB, additional steps (rotations, recoloring) are required. See textbooks / online references to implement full balancing logic.</p>
      </div>
    </div>
  )
}
