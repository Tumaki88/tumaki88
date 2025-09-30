import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const GoalsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: var(--spacing-xl);
`;

const Title = styled.h1`
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
`;

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await api.get('/goals');
        setGoals(response.data || []);
      } catch (error) {
        setGoals([
          { id: 1, title: "Complete project", progress: 75 },
          { id: 2, title: "Learn React", progress: 90 }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  if (loading) {
    return <div>Loading goals...</div>;
  }

  return (
    <GoalsContainer>
      <Header>
        <Title>Goals</Title>
      </Header>
      {goals.length > 0 ? (
        <div>
          {goals.map(goal => (
            <div key={goal.id}>
              <h3>{goal.title}</h3>
              <p>Progress: {goal.progress}%</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No goals set yet. Start creating goals!</p>
      )}
    </GoalsContainer>
  );
};

export default Goals;