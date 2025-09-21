import React from 'react';

const InsertionCode = () => (
    <pre className="code-block">
        <span className="keyword">function</span> <span className="function-name">insert</span><span className="punctuation">(</span>node, <span className="value">value</span><span className="punctuation">)</span><span className="punctuation">{'{'}</span>
        {'\n  '}<span className="comment">{'// If the tree is empty, return a new node'}</span>
        {'\n  '}<span className="control">if</span><span className="punctuation">(</span>node <span className="operator">==</span> <span className="builtin">null</span><span className="punctuation">)</span> <span className="control">return</span> <span className="builtin">new</span> Node<span className="punctuation">(</span>value<span className="punctuation">)</span>
        {'\n'}
        {'\n  '}<span className="comment">{'// Otherwise, recur down the tree'}</span>
        {'\n  '}<span className="control">if</span><span className="punctuation">(</span>value <span className="operator">&lt;</span> node.value<span className="punctuation">)</span> <span className="punctuation">{'{'}</span>
        {'\n    '}node.left <span className="operator">=</span> <span className="function-name">insert</span><span className="punctuation">(</span>node.left, value<span className="punctuation">)</span>
        {'\n  '}<span className="punctuation">{'}'}</span> <span className="control">else</span> <span className="punctuation">{'{'}</span>
        {'\n    '}node.right <span className="operator">=</span> <span className="function-name">insert</span><span className="punctuation">(</span>node.right, value<span className="punctuation">)</span>
        {'\n  '}<span className="punctuation">{'}'}</span>
        {'\n'}
        {'\n  '}<span className="comment">{'// return the (unchanged) node pointer'}</span>
        {'\n  '}<span className="control">return</span> node
        {'\n'}<span className="punctuation">{'}'}</span>
    </pre>
);

const SearchCode = () => (
    <pre className="code-block">
        <span className="keyword">function</span> <span className="function-name">search</span><span className="punctuation">(</span>node, <span className="value">value</span><span className="punctuation">)</span><span className="punctuation">{'{'}</span>
        {'\n  '}<span className="comment">{'// Base Cases: root is null or value is present at root'}</span>
        {'\n  '}<span className="control">if</span><span className="punctuation">(</span>node <span className="operator">==</span> <span className="builtin">null</span> <span className="operator">||</span> node.value <span className="operator">==</span> value<span className="punctuation">)</span> <span className="control">return</span> node
        {'\n'}
        {'\n  '}<span className="comment">{'// Value is greater than root\'s key'}</span>
        {'\n  '}<span className="control">if</span><span className="punctuation">(</span>node.value <span className="operator">&lt;</span> value<span className="punctuation">)</span> <span className="punctuation">{'{'}</span>
        {'\n    '}<span className="control">return</span> <span className="function-name">search</span><span className="punctuation">(</span>node.right, value<span className="punctuation">)</span>
        {'\n  '}<span className="punctuation">{'}'}</span>
        {'\n'}
        {'\n  '}<span className="comment">{'// Value is smaller than root\'s key'}</span>
        {'\n  '}<span className="control">return</span> <span className="function-name">search</span><span className="punctuation">(</span>node.left, value<span className="punctuation">)</span>
        {'\n'}<span className="punctuation">{'}'}</span>
    </pre>
);

const AVLBalancingCode = () => (
    <pre className="code-block">
        <span className="keyword">function</span> <span className="function-name">insert</span><span className="punctuation">(</span>node, <span className="value">value</span><span className="punctuation">)</span><span className="punctuation">{'{'}</span>
        {'\n  '}<span className="comment">{'// 1. Perform standard BST insertion'}</span>
        {'\n  ...'}
        {'\n'}
        {'\n  '}<span className="comment">{'// 2. Update height of the current node'}</span>
        {'\n  '}node.height <span className="operator">=</span> <span className="value">1</span> <span className="operator">+</span> <span className="function-name">max</span><span className="punctuation">(</span><span className="function-name">height</span><span className="punctuation">(</span>node.left<span className="punctuation">)</span>, <span className="function-name">height</span><span className="punctuation">(</span>node.right<span className="punctuation">))</span>
        {'\n'}
        {'\n  '}<span className="comment">{'// 3. Get the balance factor'}</span>
        {'\n  '}<span className="keyword">let</span> balance <span className="operator">=</span> <span className="function-name">getBalance</span><span className="punctuation">(</span>node<span className="punctuation">)</span>
        {'\n'}
        {'\n  '}<span className="comment">{'// 4. If unbalanced, then there are 4 cases'}</span>
        {'\n  '}<span className="comment">{'// Left Left Case'}</span>
        {'\n  '}<span className="control">if</span> <span className="punctuation">(</span>balance <span className="operator">&gt;</span> <span className="value">1</span> <span className="operator">&&</span> value <span className="operator">&lt;</span> node.left.value<span className="punctuation">)</span> <span className="control">return</span> <span className="function-name">rightRotate</span><span className="punctuation">(</span>node<span className="punctuation">)</span>
        {'\n'}
        {'\n  '}<span className="comment">{'// Right Right Case'}</span>
        {'\n  '}<span className="control">if</span> <span className="punctuation">(</span>balance <span className="operator">&lt;</span> <span className="value">-1</span> <span className="operator">&&</span> value <span className="operator">&gt;</span> node.right.value<span className="punctuation">)</span> <span className="control">return</span> <span className="function-name">leftRotate</span><span className="punctuation">(</span>node<span className="punctuation">)</span>
        {'\n'}
        {'\n  '}<span className="comment">{'// Left Right Case'}</span>
        {'\n  '}<span className="control">if</span> <span className="punctuation">(</span>balance <span className="operator">&gt;</span> <span className="value">1</span> <span className="operator">&&</span> value <span className="operator">&gt;</span> node.left.value<span className="punctuation">)</span> <span className="punctuation">{'{'}</span>
        {'\n    '}node.left <span className="operator">=</span> <span className="function-name">leftRotate</span><span className="punctuation">(</span>node.left<span className="punctuation">)</span>
        {'\n    '}<span className="control">return</span> <span className="function-name">rightRotate</span><span className="punctuation">(</span>node<span className="punctuation">)</span>
        {'\n  '}<span className="punctuation">{'}'}</span>
        {'\n'}
        {'\n  '}<span className="comment">{'// Right Left Case'}</span>
        {'\n  '}<span className="control">if</span> <span className="punctuation">(</span>balance <span className="operator">&lt;</span> <span className="value">-1</span> <span className="operator">&&</span> value <span className="operator">&lt;</span> node.right.value<span className="punctuation">)</span> <span className="punctuation">{'{'}</span>
        {'\n    '}node.right <span className="operator">=</span> <span className="function-name">rightRotate</span><span className="punctuation">(</span>node.right<span className="punctuation">)</span>
        {'\n    '}<span className="control">return</span> <span className="function-name">leftRotate</span><span className="punctuation">(</span>node<span className="punctuation">)</span>
        {'\n  '}<span className="punctuation">{'}'}</span>
        {'\n'}
        {'\n  '}<span className="control">return</span> node
        {'\n'}<span className="punctuation">{'}'}</span>
    </pre>
);

const RBBalancingCode = () => (
    <pre className="code-block">
        <span className="comment">{'// This function fixes violations caused by BST insertion'}</span>
        {'\n'}<span className="keyword">function</span> <span className="function-name">fixViolation</span><span className="punctuation">(</span>root, <span className="value">pt</span><span className="punctuation">)</span><span className="punctuation">{'{'}</span>
        {'\n  '}<span className="keyword">let</span> parent_pt <span className="operator">=</span> <span className="builtin">null</span><span className="punctuation">;</span>
        {'\n  '}<span className="keyword">let</span> grand_parent_pt <span className="operator">=</span> <span className="builtin">null</span><span className="punctuation">;</span>
        {'\n'}
        {'\n  '}<span className="control">while</span> <span className="punctuation">((</span>pt <span className="operator">!=</span> root<span className="punctuation">)</span> <span className="operator">&&</span> <span className="punctuation">(</span>pt.color <span className="operator">!=</span> <span className="value">'BLACK'</span><span className="punctuation">)</span> <span className="operator">&&</span> <span className="punctuation">(</span>pt.parent.color <span className="operator">==</span> <span className="value">'RED'</span><span className="punctuation">))</span> <span className="punctuation">{'{'}</span>
        {'\n    '}parent_pt <span className="operator">=</span> pt.parent<span className="punctuation">;</span>
        {'\n    '}grand_parent_pt <span className="operator">=</span> pt.parent.parent<span className="punctuation">;</span>
        {'\n'}
        {'\n    '}<span className="comment">{'/* Case : A */'}</span>
        {'\n    '}<span className="control">if</span> <span className="punctuation">(</span>parent_pt <span className="operator">==</span> grand_parent_pt.left<span className="punctuation">)</span> <span className="punctuation">{'{'}</span>
        {'\n      '}<span className="keyword">let</span> uncle_pt <span className="operator">=</span> grand_parent_pt.right<span className="punctuation">;</span>
        {'\n'}
        {'\n      '}<span className="comment">{'/* Case : 1 - The uncle is also red ---> Only Recoloring required */'}</span>
        {'\n      '}<span className="control">if</span> <span className="punctuation">(</span>uncle_pt <span className="operator">!=</span> <span className="builtin">null</span> <span className="operator">&&</span> uncle_pt.color <span className="operator">==</span> <span className="value">'RED'</span><span className="punctuation">)</span> <span className="punctuation">{'{'}</span>
        {'\n        '}grand_parent_pt.color <span className="operator">=</span> <span className="value">'RED'</span><span className="punctuation">;</span>
        {'\n        '}parent_pt.color <span className="operator">=</span> <span className="value">'BLACK'</span><span className="punctuation">;</span>
        {'\n        '}uncle_pt.color <span className="operator">=</span> <span className="value">'BLACK'</span><span className="punctuation">;</span>
        {'\n        '}pt <span className="operator">=</span> grand_parent_pt<span className="punctuation">;</span>
        {'\n      '}<span className="punctuation">{'}'}</span> <span className="control">else</span> <span className="punctuation">{'{'}</span>
        {'\n        '}<span className="comment">{'/* Case : 2 - pt is right child ---> Left-rotation required */'}</span>
        {'\n        '}<span className="control">if</span> <span className="punctuation">(</span>pt <span className="operator">==</span> parent_pt.right<span className="punctuation">)</span> <span className="punctuation">{'{'}</span>
        {'\n          '}<span className="function-name">rotateLeft</span><span className="punctuation">(</span>parent_pt<span className="punctuation">);</span>
        {'\n          '}pt <span className="operator">=</span> parent_pt<span className="punctuation">;</span>
        {'\n          '}parent_pt <span className="operator">=</span> pt.parent<span className="punctuation">;</span>
        {'\n        '}<span className="punctuation">{'}'}</span>
        {'\n'}
        {'\n        '}<span className="comment">{'/* Case : 3 - pt is left child ---> Right-rotation required */'}</span>
        {'\n        '}<span className="function-name">rotateRight</span><span className="punctuation">(</span>grand_parent_pt<span className="punctuation">);</span>
        {'\n        '}<span className="function-name">swap</span><span className="punctuation">(</span>parent_pt.color, grand_parent_pt.color<span className="punctuation">);</span>
        {'\n        '}pt <span className="operator">=</span> parent_pt<span className="punctuation">;</span>
        {'\n      '}<span className="punctuation">{'}'}</span>
        {'\n    '}<span className="punctuation">{'}'}</span>
        {'\n'}
        {'\n    '}<span className="comment">{'/* Case : B (parent is right child) - Symmetrical to Case A */'}</span>
        {'\n    '}<span className="control">else</span> <span className="punctuation">{'{'}</span> <span className="comment">{'/* ... */'}</span> <span className="punctuation">{'}'}</span>
        {'\n  '}<span className="punctuation">{'}'}</span>
        {'\n'}
        {'\n  '}root.color <span className="operator">=</span> <span className="value">'BLACK'</span><span className="punctuation">;</span>
        {'\n'}<span className="punctuation">{'}'}</span>
    </pre>
);

export default function Algorithm({treeType}){
  return (
    <div>
      <h2 className="h1">Algorithms — {treeType}</h2>
      <div className="card">
        <h3 className="small">Insertion (BST)</h3>
        <InsertionCode />
      </div>
      <div className="card">
        <h3 className="small">Search (BST)</h3>
        <SearchCode />
      </div>
      <div className="card">
        <h3 className="small">Notes on Self-Balancing Trees</h3>
        <p className="info">For AVL and Red-Black trees, the standard BST insertion is followed by additional steps to maintain the tree's balance.</p>
        <h4 className="small" style={{marginTop: '20px'}}>AVL Tree Balancing</h4>
        <p className='info'>After a standard BST insert, we traverse up from the new leaf node to the root. For each node on this path, we update its height and check its balance factor. If a node becomes unbalanced, we perform the appropriate rotation(s) to restore the AVL property.</p>
        <AVLBalancingCode />
        <h4 className="small" style={{marginTop: '20px'}}>Red-Black Tree Balancing</h4>
        <p className='info'>After a standard BST insert, the new node is colored red. This may violate some Red-Black properties (e.g., two adjacent red nodes). We then run a `fixViolation` function that uses a series of recolorings and rotations to restore the properties.</p>
        <RBBalancingCode />
      </div>
    </div>
  )
}