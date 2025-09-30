import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiBookOpen, FiSearch, FiCalendar } from 'react-icons/fi';

const MemoriesContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
`;

const Header = styled.div`
  margin-bottom: var(--spacing-xl);
`;

const Title = styled.h1`
  color: var(--text-primary);
  font-size: 1.8rem;
  margin-bottom: var(--spacing-xs);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
`;

const SearchContainer = styled.div`
  display: flex;
  margin-bottom: var(--spacing-lg);
  background-color: var(--input-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-xs);
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  padding: var(--spacing-md);
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-md);
  color: var(--text-secondary);
`;

const MemoriesList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MemoryCard = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }
`;

const MemoryDate = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--primary-light);
  font-size: 0.85rem;
  margin-bottom: var(--spacing-sm);
`;

const MemoryTitle = styled.h3`
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
`;

const MemoryExcerpt = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
`;

const NoMemories = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-secondary);
`;

const Memories = () => {
  const [memories, setMemories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchMemories = async () => {
      try {
        const res = await fetch('/api/memories');
        const data = await res.json();
        if (!cancelled) setMemories(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Memories fetch error:', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchMemories();
    return () => { cancelled = true; };
  }, []);

  const filteredMemories = memories.filter(m =>
    (m.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MemoriesContainer>
      <Header>
        <Title>
          <FiBookOpen /> Memories
        </Title>
        <Subtitle>Browse through distilled insights from past chats</Subtitle>
      </Header>

      <SearchContainer>
        <SearchIcon>
          <FiSearch />
        </SearchIcon>
        <SearchInput
          placeholder="Search memories..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      {loading ? (
        <div>Loading memories...</div>
      ) : filteredMemories.length ? (
        <MemoriesList>
          {filteredMemories.map(mem => (
            <MemoryCard key={mem.id}>
              <MemoryDate>
                <FiCalendar /> {new Date(mem.createdAt).toLocaleDateString()}
              </MemoryDate>
              <MemoryTitle>{mem.title}</MemoryTitle>
              <MemoryExcerpt>{mem.excerpt}</MemoryExcerpt>
            </MemoryCard>
          ))}
        </MemoriesList>
      ) : (
        <NoMemories>{searchTerm ? 'No matches found' : 'No memories yet.'}</NoMemories>
      )}
    </MemoriesContainer>
  );
};

export default Memories;
          