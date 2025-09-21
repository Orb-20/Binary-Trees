import React from 'react'
const STORIES = {
  BT: `Think of a family tree. At the top, you have a common ancestor (the root). Each person in the family can have at most two children, forming a simple binary tree structure that shows the hierarchy and relationships.`,
  BST: `Imagine a library where each shelf splits into two based on the book's title alphabetically. To find "Moby Dick", you start at the front desk (root) and go left for books from A-L and right for M-Z. You repeat this at each shelf, quickly narrowing down your search. That's a BST — organized decisions.`,
  AVL: `Think of an elf stacking books so that neither side of a shelf gets too tall. If one side becomes too high, the elf quickly rearranges the books (rotates the stack) to keep it balanced and prevent it from toppling over. That's an AVL tree, always keeping things tidy.`,
  RB: `Consider a road with traffic lights that can be red or black. There are strict rules, like no two red lights in a row, to ensure that traffic flows smoothly and no single path gets too congested. These rules and colors keep the flow balanced — that's a Red-Black Tree.`,
  HEAP: `Picture a tournament bracket. In a max-heap, the winner of each match (the greater value) moves up to the next round. This continues until the ultimate champion (the maximum value) is at the very top. This structure makes it easy to find the top contender at any time.`,
  TRIES: `Think of the autocomplete feature on your phone. As you start typing a word, it suggests possibilities based on the letters you've entered. A trie works similarly, storing words in a way that makes it incredibly fast to find all words with a specific prefix.`
}
export default function StoryMode({treeType}){
  const s = STORIES[treeType] || STORIES['BT']
  return (
    <div>
      <h2 className="h1">Story Mode — {treeType}</h2>
      <div className="card">
        <div className="theory-content">{s}</div>
      </div>
    </div>
  )
}