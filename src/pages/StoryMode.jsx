import React from 'react';
import { motion } from 'framer-motion';
import { STORIES } from '../stories';
import StoryTreeAnimation from '../components/StoryTreeAnimation'; // Import the new 3D component

const paragraphVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function StoryMode({ treeType }) {
  const story = STORIES[treeType] || STORIES['GENERAL'];
  const title = treeType === 'GENERAL' ? 'The Story of Trees' : `Story Mode — ${treeType}`;

  const renderParagraphBlock = (block, index) => {
    block = block.trim();
    if (!block) return null;

    let className = 'story-paragraph';
    
    if (block.toUpperCase().includes('STRICT RULE')) {
      className = 'story-rule';
    } else if (block.includes('Tree Corp:')) {
      className = 'story-subheading';
    } else if (block.startsWith('!')) {
      className = 'story-summary-bullet';
      block = block.substring(1).trim();
    } else if (block.startsWith('-')) {
      className = 'story-bullet';
      block = block.substring(1).trim();
    } else if (block.toLowerCase().startsWith('in short:')) {
      className = 'story-summary';
    }

    return (
      <motion.div 
        key={index} 
        className={className} 
        variants={paragraphVariants}
      >
        {block}
      </motion.div>
    );
  };

  const paragraphs = story.split('\n\n');

  return (
    <div>
      <h2 className="h1">{title}</h2>
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="story-content-wrapper">
          <motion.div 
            className="story-text-section"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {paragraphs.map(renderParagraphBlock)}
          </motion.div>
          
          <div className="story-visual-section">
            <StoryTreeAnimation treeType={treeType} />
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}