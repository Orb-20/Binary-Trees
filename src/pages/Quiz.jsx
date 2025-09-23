// src/pages/Quiz.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const QUIZ_LENGTH = 7;
const TIME_PER_QUESTION = 15;

// --- Helper Functions ---
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const generateQuizQuestions = (allQuestions) => {
  if (!allQuestions || allQuestions.length < QUIZ_LENGTH) return [];
  const getQs = (difficulty, count) => {
    const filtered = allQuestions.filter(q => q.difficulty === difficulty);
    return shuffleArray(filtered).slice(0, count);
  };
  const quizSet = [
    ...getQs('super-easy', 2),
    ...getQs('easy', 2),
    ...getQs('medium', 2),
    ...getQs('hard', 1),
  ];
  return shuffleArray(quizSet);
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

// Helper function to load the correct quiz module
const getQuizModule = (type) => {
  const t = type.toLowerCase();
  switch (t) {
    case 'general':
      return import('../data/quiz-general.json');
    case 'bt':
      return import('../data/quiz-bt.json');
    case 'bst':
      return import('../data/quiz-bst.json');
    case 'heap':
      return import('../data/quiz-heap.json');
    case 'tries':
      return import('../data/quiz-tries.json');
    // --- UPDATED: Removed the 'avl' case ---
    default:
      return Promise.resolve({ default: [] });
  }
};

// --- Main Component ---
export default function Quiz({ treeType }) {
  const [gameState, setGameState] = useState('loading');
  const [allCategoryQuestions, setAllCategoryQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUIZ_LENGTH * TIME_PER_QUESTION);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setGameState('loading');
    getQuizModule(treeType)
      .then(module => {
        setAllCategoryQuestions(module.default);
        setGameState('ready');
      })
      .catch((err) => {
        console.error(`Failed to load quiz for type ${treeType}:`, err);
        setAllCategoryQuestions([]);
        setGameState('ready');
      });
  }, [treeType]);

  useEffect(() => {
    if (gameState === 'active' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft <= 0 && gameState === 'active') {
      setGameState('finished');
    }
  }, [gameState, timeLeft]);

  const startQuiz = () => {
    setQuestions(generateQuizQuestions(allCategoryQuestions));
    setTimeLeft(QUIZ_LENGTH * TIME_PER_QUESTION);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setGameState('active');
  };

  const handleAnswerSelect = (option) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(option);
    if (option === questions[currentQuestionIndex].answer) {
      setScore(prev => prev + 1);
    }
    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_LENGTH - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsAnswered(false);
        setSelectedAnswer(null);
      } else {
        setGameState('finished');
      }
    }, 1200);
  };

  const getButtonClass = (option) => {
    if (!isAnswered) return 'btn-tree-op insert';
    if (option === questions[currentQuestionIndex].answer) return 'btn-tree-op insert';
    if (option === selectedAnswer) return 'btn-tree-op delete';
    return 'btn-tree-op';
  };

  const quizTitle = {
    GENERAL: 'General Tree Knowledge',
    BT: 'Binary Tree Quiz',
    BST: 'Binary Search Tree Quiz',
    HEAP: 'Heap Quiz',
    TRIES: 'Tries Quiz'
  }[treeType] || 'Quiz';


  if (gameState === 'loading') {
    return <div className="card" style={{ textAlign: 'center' }}>Loading Quiz...</div>;
  }

  if (!allCategoryQuestions || allCategoryQuestions.length < QUIZ_LENGTH) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2 className="h1">{quizTitle}</h2>
        <div className="card">
          <h3 className="small">Coming Soon!</h3>
          <p className="info" style={{ marginTop: '16px' }}>
            A quiz for this topic will be available here shortly.
          </p>
        </div>
      </div>
    );
  }

  if (gameState === 'ready') {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2 className="h1">{quizTitle}</h2>
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="small">Ready for a challenge?</h3>
          <p className="info" style={{ margin: '16px' }}>You'll face {QUIZ_LENGTH} questions. Good luck!</p>
          <button className="btn-tree-op insert" style={{ padding: '12px 24px' }} onClick={startQuiz}>
            Start Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2 className="h1">Quiz Complete!</h2>
        <motion.div className="card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <h3 className="small">Final Score for {quizTitle}</h3>
          <p style={{ fontSize: '3rem', margin: '16px 0', fontWeight: 'bold', color: 'var(--primary)' }}>
            {score} / {QUIZ_LENGTH}
          </p>
          <button className="btn-tree-op delete" onClick={startQuiz}>Play Again</button>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 className="h1">Question {currentQuestionIndex + 1}/{QUIZ_LENGTH}</h2>
        <div className="card" style={{ padding: '8px 16px', marginBottom: '0' }}>
          <span style={{ fontWeight: 'bold', color: 'var(--color-burnt-copper)' }}>{formatTime(timeLeft)}</span>
        </div>
      </div>
      <motion.div key={currentQuestionIndex} className="card" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
        <h3 className="small" style={{ marginBottom: '24px', textAlign: 'center', minHeight: '50px' }}>{currentQuestion.question}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              className={getButtonClass(option)}
              onClick={() => handleAnswerSelect(option)}
              disabled={isAnswered}
              style={{ width: '100%', minHeight: '50px' }}
            >
              {option}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}