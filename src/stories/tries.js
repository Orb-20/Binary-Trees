export const trieStory = `Tree Corp: The “Dictionary Department” (Tries)
In Tree Corp, after all the rules about teammates and hierarchies, the CEO noticed a new problem.
People kept mixing up names, words, and codes when storing data.

So the CEO opened a new branch:
The Dictionary Department
Here’s how it worked:

Each letter of a word got its own teammate (node).
Starting from the Root (like the empty page of a dictionary), every teammate represented one step/letter in a word.
Example:

To store the word “CAT”:
First teammate = C
From C’s team = A
From A’s team = T
Boom — the word CAT is built step by step in the org chart.
Now if another word like “CAR” comes:

It still starts with C -> A (same path as CAT).
But instead of T, a new teammate R joins.
✨ That’s the magic of the Dictionary Department:

Common beginnings (prefixes) are shared.
Words branch only when they differ.
Why Tree Corp loves this system:

🏎️ Fast searching -> Want to check if a word exists? Just follow the letters down.
🧩 Memory saving -> No need to repeat prefixes again and again.
📖 Perfect for auto-complete -> Start typing “CA” and boom, you instantly see CAT, CAR, CAN, etc.
👉 In short:

Trie = A Tree where each level stores a part of a word (like letters), and paths form words.
Think of it as Tree Corp’s dictionary team, where teammates line up to spell out words together.`;