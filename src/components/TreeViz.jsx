import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

// --- Initial Data for Different Tree Types ---
const initialData = {
  BST: { name: 50, children: [{ name: 30, children: [{ name: 20 }, { name: 40 }] }, { name: 70, children: [{ name: 60 }, { name: 80 }] }] },
  AVL: { name: 40, children: [{ name: 20, children: [{ name: 10 }, { name: 30 }] }, { name: 60, children: [{ name: 50 }, { name: 70 }] }] },
  RB: { name: 30, children: [{ name: 20 }, { name: 50, children: [{ name: 40 }, { name: 60 }] }] },
  // Default to BST if type not found
};

export default function TreeViz({ treeType = 'BST' }) {
  const ref = useRef();
  const [treeData, setTreeData] = useState(initialData[treeType] || initialData.BST);
  const [inputValue, setInputValue] = useState('');
  const [analysis, setAnalysis] = useState('');

  // --- Core D3 Drawing Logic ---
  const drawTree = useCallback(() => {
    const el = ref.current;
    if (!el || !treeData) return;
    
    // Clear previous SVG
    d3.select(el).select('svg').remove();

    const width = el.clientWidth;
    const height = el.clientHeight;
    const svg = d3.select(el).append('svg').attr('width', width).attr('height', height);
    const g = svg.append('g').attr('transform', `translate(40, 40)`);

    const root = d3.hierarchy(treeData);
    const treeLayout = d3.tree().size([width - 80, height - 100]);
    treeLayout(root);

    const duration = 500;

    // --- Links ---
    const links = g.selectAll('path.link').data(root.links(), d => d.target.data.name);

    links.enter().append('path')
      .attr('class', 'link')
      .attr('d', d3.linkVertical().x(d => d.x).y(d => d.y))
      .attr('stroke', '#C6A15B')
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('opacity', 0)
      .transition().duration(duration).attr('opacity', 1);

    links.transition().duration(duration)
      .attr('d', d3.linkVertical().x(d => d.x).y(d => d.y));

    links.exit()
      .transition().duration(duration)
      .attr('opacity', 0)
      .remove();

    // --- Nodes ---
    const nodes = g.selectAll('.node').data(root.descendants(), d => d.data.name);

    const nodeEnter = nodes.enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .attr('opacity', 0);

    nodeEnter.append('circle').attr('r', 20)
      .attr('fill', 'rgba(15, 166, 131, 0.1)')
      .attr('stroke', '#0FA683')
      .attr('stroke-width', 2);

    nodeEnter.append('text').text(d => d.data.name)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', '#0B0F13')
      .attr('font-size', 14)
      .attr('font-weight', 'bold');

    nodeEnter.transition().duration(duration).attr('opacity', 1);

    nodes.transition().duration(duration)
      .attr('transform', d => `translate(${d.x},${d.y})`);

    nodes.exit()
      .transition().duration(duration)
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .attr('opacity', 0)
      .remove();
  }, [treeData]);

  // --- Tree Analysis Logic ---
  const analyzeTree = useCallback((node) => {
    if (!node || !node.name) {
      setAnalysis('Tree is empty.');
      return;
    }

    const properties = [];
    const nodeCount = d3.hierarchy(node).descendants().length;
    const height = d3.hierarchy(node).height;

    // isPerfect
    if (nodeCount === Math.pow(2, height + 1) - 1) {
      properties.push('Perfect');
    }

    // isComplete
    function checkComplete(root, index, count) {
      if (root === null || root === undefined) return true;
      if (index >= count) return false;
      return checkComplete(root.children?.[0], 2 * index + 1, count) &&
             checkComplete(root.children?.[1], 2 * index + 2, count);
    }
    if (checkComplete(node, 0, nodeCount)) {
      properties.push('Complete');
    }

    // isSkewed
    const isSkewed = d3.hierarchy(node).descendants().every(d => !d.children || d.children.length <= 1);
    if (isSkewed) {
      properties.push('Skewed');
    }

    setAnalysis(properties.length > 0 ? `Tree is: ${properties.join(', ')}` : 'This is a standard Binary Search Tree.');
  }, []);

  // --- Effects ---
  useEffect(() => {
    setTreeData(initialData[treeType] || initialData.BST);
  }, [treeType]);

  useEffect(() => {
    drawTree();
    if (treeData) analyzeTree(treeData);
  }, [treeData, drawTree, analyzeTree]);

  // --- BST Manipulation Logic ---
  const handleInsert = () => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value)) return;

    const insertNode = (node) => {
      if (!node) return { name: value };
      if (value < node.name) {
        node.children = node.children || [];
        const leftChild = node.children.find(c => c.name < node.name);
        const rightChild = node.children.find(c => c.name > node.name);
        const newLeft = insertNode(leftChild);
        if (!leftChild) node.children.unshift(newLeft);
        else Object.assign(leftChild, newLeft);
      } else if (value > node.name) {
        node.children = node.children || [];
        const rightChild = node.children.find(c => c.name > node.name);
        const newRight = insertNode(rightChild);
        if (!rightChild) node.children.push(newRight);
        else Object.assign(rightChild, newRight);
      }
      // Ensure children are sorted for consistent structure
      if(node.children) node.children.sort((a,b) => a.name - b.name);
      return node;
    };

    setTreeData(prevData => insertNode(JSON.parse(JSON.stringify(prevData))));
    setInputValue('');
  };

  const handleDelete = () => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value)) return;

    const findMinValue = (node) => {
      let current = node;
      while (current.children && current.children.find(c => c.name < current.name)) {
        current = current.children.find(c => c.name < current.name);
      }
      return current;
    };
    
    const deleteNode = (node, val) => {
        if (!node) return null;
        if (val < node.name) {
            const leftChild = node.children?.find(c => c.name < node.name);
            const newLeft = deleteNode(leftChild, val);
            if (!newLeft) {
                node.children = node.children.filter(c => c.name > node.name);
            }
        } else if (val > node.name) {
            const rightChild = node.children?.find(c => c.name > node.name);
            const newRight = deleteNode(rightChild, val);
            if (!newRight) {
                node.children = node.children.filter(c => c.name < node.name);
            }
        } else {
            // Node to be deleted found
            const leftChild = node.children?.find(c => c.name < node.name);
            const rightChild = node.children?.find(c => c.name > node.name);

            if (!leftChild && !rightChild) return null;
            if (!leftChild) return rightChild;
            if (!rightChild) return leftChild;

            const temp = findMinValue(rightChild);
            node.name = temp.name;
            const newRight = deleteNode(rightChild, temp.name);
            if (!newRight) {
                 node.children = node.children.filter(c => c.name < node.name);
            }
        }
        if(!node.children || node.children.length === 0) delete node.children;
        return node;
    };

    setTreeData(prevData => deleteNode(JSON.parse(JSON.stringify(prevData)), value));
    setInputValue('');
  };


  return (
    <div>
      <h2 className="h1">Interactive Tree Visualization</h2>
      <div className="card controls-container">
        <input
          type="number"
          className="tree-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a value..."
        />
        <button className="btn-tree-op insert" onClick={handleInsert}>Insert</button>
        <button className="btn-tree-op delete" onClick={handleDelete}>Delete</button>
      </div>
      <div className="card analysis-result">
          {analysis}
      </div>
      <div className="card canvas-wrap">
        <motion.div ref={ref} style={{ width: '100%', height: '100%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
      </div>
    </div>
  );
}