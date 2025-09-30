import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    // ...existing code...

    try {
      // ...existing code...

      // Check if the message is about completing math
      if (/i completed math(s)? today/i.test(message)) {
        // Add a subtle notification that the memory was saved
        setMessages(prev => [...prev, {
          role: 'system',
          content: 'Memory saved: You completed math today',
          isMemoryNotification: true
        }]);
      }

      // ...existing code...
    } catch (error) {
      // ...existing code...
    }
  };

  return (
    <div>
      {/* ...existing code... */}
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.role === 'user' ? 'user-message' : 'ai-message'} ${msg.isMemoryNotification ? 'memory-notification' : ''}`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      {/* ...existing code... */}
    </div>
  );
};

export default Chat;