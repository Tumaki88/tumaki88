import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const JournalContainer = styled.div`
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

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await api.get('/journal');
        setEntries(response.data || []);
      } catch (error) {
        setEntries([
          { id: 1, date: new Date(), reflection: "This is a sample journal entry." },
          { id: 2, date: new Date(Date.now() - 86400000), reflection: "Another sample entry from yesterday." }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  if (loading) {
    return <div>Loading journal entries...</div>;
  }

  return (
    <JournalContainer>
      <Header>
        <Title>Journal</Title>
      </Header>
      {entries.length > 0 ? (
        <div>
          {entries.map(entry => (
            <div key={entry.id}>
              <h3>{new Date(entry.date).toDateString()}</h3>
              <p>{entry.reflection}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No journal entries yet. Start writing!</p>
      )}
    </JournalContainer>
  );
};

export default Journal;