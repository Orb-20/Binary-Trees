import React from 'react'
const STORIES = {
  BST: `Imagine a library where each shelf splits into two based on book's alphabet. To find Moby Dick you start at the front desk (root) and go left/right depending on whether M comes before or after. That's a BST — organized decisions.`,
  AVL: `Think of an elf stacking books so that neither side of a shelf goes too tall. When imbalance happens, they rotate the stack to keep it tidy — that's an AVL.`,
  RB: `Consider a road with traffic lights: red and black. Rules ensure cars don't pile more at one path than another; colors and rules keep the flow balanced — that's a Red-Black Tree.`
}
export default function StoryMode({treeType}){
  const s = STORIES[treeType] || STORIES['BST']
  return (
    <div>
      <h2 className="h1">Story Mode — {treeType}</h2>
      <div className="card">
        <div className="theory-content">{s}</div>
      </div>
    </div>
  )
}
