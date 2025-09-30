import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FiSend, FiUser } from 'react-icons/fi';

const ChatContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  height: calc(100vh - 3rem);
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  margin-bottom: var(--spacing-md);
`;

const ChatTitle = styled.h1`
  color: var(--text-primary);
  font-size: 1.8rem;
  margin-bottom: var(--spacing-xs);
`;

const ChatSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md) 0;
  margin-bottom: var(--spacing-md);
`;

const MessageGroup = styled.div`
  margin-bottom: var(--spacing-lg);
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-xs);
  gap: var(--spacing-sm);
`;

const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${props => props.isUser ? 'var(--primary)' : '#1c8786'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const SenderName = styled.span`
  font-weight: 600;
  color: ${props => props.isUser ? 'var(--primary-light)' : '#22c2bf'};
`;

const Message = styled.div`
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: ${props => props.isUser ? 'rgba(127, 92, 255, 0.1)' : 'var(--card-bg)'};
  color: var(--text-primary);
  max-width: 85%;
  line-height: 1.6;
  margin-left: ${props => props.isUser ? 'auto' : '0'};
`;

const InputContainer = styled.div`
  display: flex;
  padding: var(--spacing-sm);
  background-color: var(--input-bg);
  border-radius: var(--border-radius-lg);
  margin-top: auto;
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  padding: var(--spacing-md);
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;
`;

const SendButton = styled.button`
  background-color: var(--primary);
  color: white;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Remove direct endpoint/key (now handled by backend)
// const AI_AGENT_ENDPOINT = ...
// const AI_AGENT_KEY = ...

function extractAssistantText(data) {
  // DigitalOcean agent endpoint returns OpenAI-compatible format:
  // { choices: [{ message: { role: 'assistant', content: '...' } }] }
  if (!data) return null;
  if (typeof data === 'string') return data;
  if (data.response) return data.response;
  if (data.message) return data.message;
  if (data.choices && Array.isArray(data.choices) && data.choices[0]?.message?.content) {
    return data.choices[0].message.content;
  }
  return null;
}

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Tumaki',
      content: "Hello! I'm Tumaki, your AI friend and coach. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'You',
      content: input.trim(),
      timestamp: new Date()
    };

    const snapshot = [...messages, userMessage];
    setMessages(snapshot);
    setInput('');
    setLoading(true);

    const placeholderId = Date.now() + 1;
    setMessages(prev => [
      ...prev,
      {
        id: placeholderId,
        sender: 'Tumaki',
        content: 'Thinking...',
        timestamp: new Date(),
        placeholder: true
      }
    ]);

    try {
      // Try both new and legacy payloads for backend compatibility
      let res = await fetch('http://localhost:5002/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: snapshot.map(m => ({
            role: m.sender === 'You' ? 'user' : 'assistant',
            content: m.content
          })),
          stream: false,
          include_functions_info: false,
          include_retrieval_info: false,
          include_guardrails_info: false
        })
      });

      let data;
      let text = await res.text();
      try { data = JSON.parse(text); } catch { data = text; }

      // If backend expects {message, history} and returns 400, try fallback
      if (!res.ok && res.status === 400) {
        res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage.content,
            history: snapshot.map(m => ({
              role: m.sender === 'You' ? 'user' : 'assistant',
              content: m.content
            }))
          })
        });
        text = await res.text();
        try { data = JSON.parse(text); } catch { data = text; }
      }

      if (!res.ok) {
        throw new Error(typeof data === 'string' ? data : (data?.error || 'Agent error'));
      }

      const assistantText = extractAssistantText(data) || "I couldn't parse a response, but I'm here.";
      setMessages(prev =>
        prev.map(m =>
          m.id === placeholderId
            ? { ...m, content: assistantText, placeholder: false, timestamp: new Date() }
            : m
        )
      );
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev =>
        prev.map(m =>
          m.id === placeholderId
            ? { ...m, content: "Sorry, I had trouble reaching the server. Please try again.", placeholder: false }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>Tumaki AI Assistant</ChatTitle>
        <ChatSubtitle>Your personal AI friend that remembers conversations</ChatSubtitle>
      </ChatHeader>
      
      <MessagesContainer>
        {messages.map((msg) => (
          <MessageGroup key={msg.id}>
            <MessageHeader>
              <Avatar isUser={msg.sender === 'You'}>
                {msg.sender === 'You' ? <FiUser size={16} /> : 'T'}
              </Avatar>
              <SenderName isUser={msg.sender === 'You'}>{msg.sender}</SenderName>
            </MessageHeader>
            <Message isUser={msg.sender === 'You'}>
              {msg.content}
            </Message>
          </MessageGroup>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      <InputContainer>
        <Input 
          type="text" 
          placeholder="Type your message..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <SendButton onClick={handleSend} disabled={!input.trim() || loading}>
          <FiSend /> Send
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default Chat;