import React from 'react';
import styled from 'styled-components';
import { FiBook, FiActivity, FiTarget, FiTrendingUp } from 'react-icons/fi';

const StatsCard = styled.div`
  background: var(--card-bg);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
`;

const StatsTitle = styled.h3`
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-md);
  background: var(--background);
  border-radius: var(--border-radius-md);
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color || 'var(--primary)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-sm);
  
  svg {
    color: white;
    font-size: 1.2rem;
  }
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-align: center;
`;

const QuickStats = ({ stats }) => {
  const defaultStats = {
    studyHours: 0,
    exerciseCompleted: false,
    moodRating: 0,
    goalsProgress: 0
  };

  const currentStats = stats || defaultStats;

  return (
    <StatsCard>
      <StatsTitle>Today's Overview</StatsTitle>
      
      <StatsGrid>
        <StatItem>
          <StatIcon color="var(--primary)">
            <FiBook />
          </StatIcon>
          <StatValue>{currentStats.studyHours || 0}h</StatValue>
          <StatLabel>Study Hours</StatLabel>
        </StatItem>
        
        <StatItem>
          <StatIcon color="var(--success)">
            <FiActivity />
          </StatIcon>
          <StatValue>{currentStats.exerciseCompleted ? '✓' : '×'}</StatValue>
          <StatLabel>Exercise</StatLabel>
        </StatItem>
        
        <StatItem>
          <StatIcon color="var(--accent)">
            <FiTrendingUp />
          </StatIcon>
          <StatValue>{currentStats.moodRating || 0}/10</StatValue>
          <StatLabel>Mood Rating</StatLabel>
        </StatItem>
        
        <StatItem>
          <StatIcon color="var(--secondary)">
            <FiTarget />
          </StatIcon>
          <StatValue>{currentStats.goalsProgress || 0}%</StatValue>
          <StatLabel>Goals Progress</StatLabel>
        </StatItem>
      </StatsGrid>
    </StatsCard>
  );
};

export default QuickStats;
