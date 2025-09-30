import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: var(--card-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-lg);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const DateDisplay = styled.h3`
  color: var(--text-primary);
`;

const JournalEntryCard = ({ entry, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader>
        <DateDisplay>{new Date(entry.date).toDateString()}</DateDisplay>
        <div>
          <button onClick={() => onEdit(entry)}>Edit</button>
          <button onClick={() => onDelete(entry._id)}>Delete</button>
        </div>
      </CardHeader>
      <div>
        <h4>Study</h4>
        <p>Hours: {entry.study.hours}</p>
        <p>Productivity: {entry.study.productivity}/10</p>
      </div>
      <div>
        <h4>Reflection</h4>
        <p>{entry.reflection}</p>
      </div>
    </Card>
  );
};

export default JournalEntryCard;
