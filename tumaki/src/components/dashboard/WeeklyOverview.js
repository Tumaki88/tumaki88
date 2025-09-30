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

const WeeklyOverview = ({ data }) => {
  return (
    <Card>
      <Title>Weekly Overview</Title>
      {data ? (
        <div>
          <p>Chart or weekly data will be displayed here.</p>
        </div>
      ) : (
        <p>No weekly data available.</p>
      )}
    </Card>
  );
};

export default WeeklyOverview;
