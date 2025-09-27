// src/stories/dialogue.js
export const DIALOGUE = {
  GENERAL: [
    { mascotId: 'kiki', reaction: 'greet', text: "Hi there! Welcome to Tree Corp. I'm Kiki, your guide.", animationTarget: null },
    { mascotId: 'kiki', reaction: 'explain', text: "At the top, we have our CEO. She's the 'Root' of our company.", animationTarget: { type: 'node', label: 'CEO' } },
    { mascotId: 'bolt', reaction: 'celebrate', text: "And the CEO hires managers, who are the 'Nodes' of our tree!", animationTarget: { type: 'node', label: 'Manager' } },
    { mascotId: 'kiki', reaction: 'explain', text: "Exactly, Bolt! Every employee reports to just one supervisor, their 'parent'.", animationTarget: { type: 'link', start: 'CEO', end: 'Manager' } },
    { mascotId: 'bolt', reaction: 'explain', text: "Some of us don't manage anyone. We're called 'Leaves'!", animationTarget: { type: 'node', label: 'Team' } },
    { mascotId: 'sage', reaction: 'recap', text: "This clear structure helps us stay organized and find anyone easily.", animationTarget: { type: 'reset' } }
  ],
  BT: [
    { mascotId: 'kiki', reaction: 'explain', text: "At Tree Corp, we have a special rule called the 'Two-Member Policy'.", animationTarget: null },
    { mascotId: 'bolt', reaction: 'nudge', text: "It means every manager can have at most TWO team members!", animationTarget: { type: 'node', label: 'Manager' } },
    { mascotId: 'kiki', reaction: 'hint', text: "We call them a 'left child' and a 'right child'.", animationTarget: { type: 'link', start: 'Manager', end: 'Team' } },
    { mascotId: 'sage', reaction: 'recap', text: "This structure is a Binary Tree. Simple and tidy!", animationTarget: { type: 'reset' } },
  ],
  BST: [
    { mascotId: 'kiki', reaction: 'explain', text: "To make things even more efficient, we have the 'Sorted Teammates Policy'.", animationTarget: null },
    { mascotId: 'bolt', reaction: 'explain', text: "If a new team member has a lower rank (like 20), they go to the LEFT of their manager (30).", animationTarget: { type: 'node', value: 20 } },
    { mascotId: 'bolt', reaction: 'explain', text: "And if they have a higher rank (like 40), they go to the RIGHT!", animationTarget: { type: 'node', value: 40 } },
    { mascotId: 'sage', reaction: 'recap', text: "This creates a Binary Search Tree, or BST. It makes finding employees super fast!", animationTarget: { type: 'reset' } },
  ],
  HEAP: [
    { mascotId: 'kiki', reaction: 'explain', text: "Our latest policy is the 'Strongest-on-Top' rule, which creates a Heap.", animationTarget: null },
    { mascotId: 'bolt', reaction: 'celebrate', text: "In a Max-Heap, the manager (like 100) always has the highest value!", animationTarget: { type: 'node', value: 100 } },
    { mascotId: 'kiki', reaction: 'hint', text: "And in a Min-Heap, the manager has the lowest value.", animationTarget: null },
    { mascotId: 'sage', reaction: 'recap', text: "It's perfect for things like priority lists and leaderboards!", animationTarget: { type: 'reset' } },
  ],
  TRIES: [
    { mascotId: 'kiki', reaction: 'greet', text: "Finally, let's visit the 'Dictionary Department', which is structured as a Trie.", animationTarget: null },
    { mascotId: 'bolt', reaction: 'explain', text: "Here, each letter of a word is a team member!", animationTarget: { type: 'node', label: 'C' } },
    { mascotId: 'kiki', reaction: 'explain', text: "For the word 'CAT', you'd go from 'C', to 'A', to 'T'.", animationTarget: { type: 'node', label: 'T' } },
    { mascotId: 'bolt', reaction: 'celebrate', text: "Words with common beginnings, like 'CAT' and 'CAR', share the same path for 'C' and 'A'!", animationTarget: { type: 'link', start: 'A', end: 'R' } },
    { mascotId: 'sage', reaction: 'recap', text: "This makes Tries perfect for auto-complete and spell-checking.", animationTarget: { type: 'reset' } },
  ]
};