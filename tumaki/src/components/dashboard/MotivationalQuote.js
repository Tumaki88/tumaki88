import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiStar, FiRefreshCw } from 'react-icons/fi';

const QuoteCard = styled.div`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: white;
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  position: relative;
  overflow: hidden;
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  opacity: 0.3;
`;

const QuoteText = styled.blockquote`
  font-size: 1.2rem;
  font-style: italic;
  line-height: 1.5;
  margin-bottom: var(--spacing-md);
  position: relative;
  z-index: 1;
`;

const QuoteAuthor = styled.cite`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const RefreshButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-sm);
  cursor: pointer;
  transition: all 0.3s ease;
  float: right;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const quotes = [
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Unknown"
  },
  {
    text: "Push yourself, because no one else is going to do it for you.",
    author: "Unknown"
  }
];

const MotivationalQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    // Set a random quote on component mount
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  const getNewQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  };

  return (
    <QuoteCard>
      <QuoteIcon>
        <FiStar size={48} />
      </QuoteIcon>
      
      <QuoteText>"{currentQuote.text}"</QuoteText>
      <QuoteAuthor>— {currentQuote.author}</QuoteAuthor>
      
      <RefreshButton onClick={getNewQuote}>
        <FiRefreshCw />
      </RefreshButton>
    </QuoteCard>
  );
};

export default MotivationalQuote;
