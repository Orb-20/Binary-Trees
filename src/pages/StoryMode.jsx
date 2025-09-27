// src/pages/StoryMode.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DIALOGUE } from '../stories/dialogue';
import StoryTreeAnimation from '../components/StoryTreeAnimation';
import AnimatedMascot from '../components/AnimatedMascot';
import { MASCOT_META } from '../mascot.config'; // Import the new config file

export default function StoryMode({ treeType }) {
  const [fullDialogue, setFullDialogue] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationFocus, setAnimationFocus] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const storyDialogue = DIALOGUE[treeType] || DIALOGUE['GENERAL'];
    setFullDialogue(storyDialogue);
    
    if (storyDialogue.length > 0) {
        setConversation([storyDialogue[0]]);
        setCurrentIndex(0);
        setAnimationFocus(storyDialogue[0].animationTarget);
    } else {
        setConversation([]);
        setCurrentIndex(0);
        setAnimationFocus(null);
    }
  }, [treeType]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleNext = () => {
    if (currentIndex >= fullDialogue.length - 1) return;
    const nextIndex = currentIndex + 1;
    const nextLine = fullDialogue[nextIndex];
    setCurrentIndex(nextIndex);
    setConversation(prev => [...prev, nextLine]);
    setAnimationFocus(nextLine.animationTarget);
  };

  return (
    <div>
      <h2 className="h1">Story Mode — {treeType}</h2>
      <div className="card story-canvas">
        <div className="story-animation-panel-small">
          <StoryTreeAnimation treeType={treeType} animationFocus={animationFocus} />
        </div>
        
        <div className="story-chat-panel">
          <div className="story-chat-log">
            <AnimatePresence>
              {conversation.map((line, index) => {
                const mascotInfo = MASCOT_META[line.mascotId];
                return (
                  <motion.div
                    key={index}
                    className={`chat-message-row ${line.mascotId}`}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    layout
                  >
                    <AnimatedMascot character={line.mascotId} reaction={line.reaction} size={60} />
                    <div 
                      className="chat-bubble"
                      style={{
                        backgroundColor: mascotInfo.bubbleBg,
                        color: mascotInfo.bubbleColor,
                        border: `1px solid ${mascotInfo.color}33` // Use mascot color with opacity for border
                      }}
                    >
                      {line.text}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex >= fullDialogue.length - 1}
            className="btn-tree-op insert"
            style={{ width: '100%', marginTop: '16px', flexShrink: 0 }}
          >
            {currentIndex >= fullDialogue.length - 1 ? 'End of Story' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}