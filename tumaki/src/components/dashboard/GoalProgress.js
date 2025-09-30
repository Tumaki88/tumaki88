import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: var(--card-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
`;

const Title = styled.h3`
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
`;

const GoalProgress = ({ goals }) => {
  return (
    <Card>
      <Title>Goal Progress</Title>
      {goals && goals.length > 0 ? (
        <ul>
          {goals.map(goal => (
            <li key={goal.id}>{goal.title}</li>
          ))}
        </ul>
      ) : (
        <p>No goals set yet.</p>
      )}
    </Card>
  );
};

export default GoalProgress;
