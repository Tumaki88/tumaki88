import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--secondary) 0%, var(--primary-light) 100%);
  padding: var(--spacing-lg);
`;

const RegisterCard = styled.div`
  background: var(--card-bg);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 400px;
`;

const Logo = styled.h1`
  text-align: center;
  color: var(--primary);
  margin-bottom: var(--spacing-md);
  font-size: 2rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: var(--spacing-md);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: var(--spacing-md);
`;

const Label = styled.label`
  margin-bottom: var(--spacing-xs);
  font-weight: bold;
`;

const Input = styled.input`
  padding: var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  width: 100%;
`;

const SubmitButton = styled.button`
  background: var(--primary);
  color: white;
  padding: var(--spacing-sm);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;

  &:hover {
    background: var(--primary-dark);
  }

  &:disabled {
    background: var(--primary-light);
    cursor: not-allowed;
  }
`;

const SignupLink = styled.p`
  text-align: center;
  margin-top: var(--spacing-md);
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <Logo>Tumaki Coach</Logo>
        <Subtitle>Start your journey to success</Subtitle>
        
        {(error || formError) && <ErrorMessage>{error || formError}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </InputGroup>
          
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </SubmitButton>
        </Form>
        
        <SignupLink>
          Already have an account? <Link to="/login">Sign in</Link>
        </SignupLink>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;