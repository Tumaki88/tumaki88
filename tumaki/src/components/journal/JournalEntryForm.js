import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiSave, FiX } from 'react-icons/fi';

const FormCard = styled.div`
  background: var(--card-bg);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-lg);
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
`;

const FormTitle = styled.h3`
  color: var(--text-primary);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  
  &:hover {
    background: var(--background);
  }
`;

const FormSection = styled.div`
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--background);
  border-radius: var(--border-radius-md);
`;

const SectionTitle = styled.h4`
  color: var(--primary);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
`;

const Input = styled.input`
  padding: var(--spacing-sm);
  border: 1px solid var(--text-light);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const TextArea = styled.textarea`
  padding: var(--spacing-sm);
  border: 1px solid var(--text-light);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Slider = styled.input`
  width: 100%;
  margin: var(--spacing-sm) 0;
`;

const SliderValue = styled.div`
  text-align: center;
  font-weight: 600;
  color: var(--primary);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  margin-top: var(--spacing-lg);
`;

const SaveButton = styled.button`
  background: var(--success);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
`;

const CancelButton = styled.button`
  background: var(--text-light);
  color: var(--text-primary);
  border: none;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
  cursor: pointer;
`;

const JournalEntryForm = ({ entry, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    study: {
      hours: 0,
      subjects: [],
      productivity: 5
    },
    exercise: {
      completed: false,
      type: '',
      duration: 0,
      exercises: []
    },
    mood: {
      rating: 5,
      notes: ''
    },
    reflection: ''
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        ...entry,
        date: new Date(entry.date).toISOString().split('T')[0]
      });
    }
  }, [entry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <FormCard>
      <FormHeader>
        <FormTitle>{entry ? 'Edit Entry' : 'New Journal Entry'}</FormTitle>
        <CloseButton onClick={onCancel}>
          <FiX size={20} />
        </CloseButton>
      </FormHeader>

      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Date</Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange(null, 'date', e.target.value)}
            required
          />
        </InputGroup>

        <FormSection>
          <SectionTitle>📚 Study Session</SectionTitle>
          <InputRow>
            <InputGroup>
              <Label>Hours Studied</Label>
              <Input
                type="number"
                step="0.5"
                min="0"
                value={formData.study.hours}
                onChange={(e) => handleInputChange('study', 'hours', parseFloat(e.target.value))}
              />
            </InputGroup>
            <InputGroup>
              <Label>Productivity (1-10)</Label>
              <Slider
                type="range"
                min="1"
                max="10"
                value={formData.study.productivity}
                onChange={(e) => handleInputChange('study', 'productivity', parseInt(e.target.value))}
              />
              <SliderValue>{formData.study.productivity}/10</SliderValue>
            </InputGroup>
          </InputRow>
        </FormSection>

        <FormSection>
          <SectionTitle>💪 Exercise</SectionTitle>
          <InputRow>
            <InputGroup>
              <Label>
                <input
                  type="checkbox"
                  checked={formData.exercise.completed}
                  onChange={(e) => handleInputChange('exercise', 'completed', e.target.checked)}
                />
                {' '}Completed workout
              </Label>
            </InputGroup>
            <InputGroup>
              <Label>Exercise Type</Label>
              <Input
                type="text"
                value={formData.exercise.type}
                onChange={(e) => handleInputChange('exercise', 'type', e.target.value)}
                placeholder="e.g., Running, Gym, Yoga"
              />
            </InputGroup>
            <InputGroup>
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                min="0"
                value={formData.exercise.duration}
                onChange={(e) => handleInputChange('exercise', 'duration', parseInt(e.target.value))}
              />
            </InputGroup>
          </InputRow>
        </FormSection>

        <FormSection>
          <SectionTitle>😊 Mood & Reflection</SectionTitle>
          <InputGroup>
            <Label>Mood Rating (1-10)</Label>
            <Slider
              type="range"
              min="1"
              max="10"
              value={formData.mood.rating}
              onChange={(e) => handleInputChange('mood', 'rating', parseInt(e.target.value))}
            />
            <SliderValue>{formData.mood.rating}/10</SliderValue>
          </InputGroup>
          
          <InputGroup>
            <Label>Mood Notes</Label>
            <TextArea
              value={formData.mood.notes}
              onChange={(e) => handleInputChange('mood', 'notes', e.target.value)}
              placeholder="How are you feeling today?"
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Daily Reflection</Label>
            <TextArea
              value={formData.reflection}
              onChange={(e) => handleInputChange(null, 'reflection', e.target.value)}
              placeholder="What went well today? What could be improved?"
            />
          </InputGroup>
        </FormSection>

        <ButtonGroup>
          <CancelButton type="button" onClick={onCancel}>
            Cancel
          </CancelButton>
          <SaveButton type="submit">
            <FiSave /> Save Entry
          </SaveButton>
        </ButtonGroup>
      </form>
    </FormCard>
  );
};

export default JournalEntryForm;
