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

const RecentActivity = ({ entries }) => {
  return (
    <Card>
      <Title>Recent Activity</Title>
      {entries && entries.length > 0 ? (
        <ul>
          {entries.map(entry => (
            <li key={entry.id}>{new Date(entry.date).toLocaleDateString()} - {entry.reflection.substring(0, 50)}...</li>
          ))}
        </ul>
      ) : (
        <p>No recent journal entries.</p>
      )}
    </Card>
  );
};

export default RecentActivity;
