const axios = require('axios');
const ChatHistory = require('../models/ChatHistory');

// @desc    Send message to AI coach
// @route   POST /api/chat/message
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    const userId = req.user._id;
    
    let conversation;
    
    // Find existing conversation or create new one
    if (conversationId) {
      conversation = await ChatHistory.findOne({ 
        _id: conversationId,
        user: userId
      });
      
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }
    } else {
      conversation = new ChatHistory({
        user: userId,
        title: 'New Conversation',
        messages: []
      });
    }
    
    // Add user message to history
    conversation.messages.push({
      role: 'user',
      content: message
    });
    
    // Get memory keys for context
    const memoryKeys = conversation.memoryKeys || [];
    
    // Construct the conversation history for AI
    const conversationHistory = conversation.messages.map(m => ({
      role: m.role,
      content: m.content
    }));
    
    // Call the AI agent
    const aiResponse = await callAIAgent(message, conversationHistory, memoryKeys);
    
    // Extract memory from AI response if available
    if (aiResponse.memory && aiResponse.memory.length > 0) {
      aiResponse.memory.forEach(item => {
        // Check if this key already exists
        const existingIndex = memoryKeys.findIndex(k => k.key === item.key);
        
        if (existingIndex >= 0) {
          // Update existing key
          memoryKeys[existingIndex].value = item.value;
        } else {
          // Add new key
          memoryKeys.push({ key: item.key, value: item.value });
        }
      });
      
      conversation.memoryKeys = memoryKeys;
    }
    
    // Add AI response to history
    conversation.messages.push({
      role: 'assistant',
      content: aiResponse.message
    });
    
    // Update the conversation title if it's new
    if (conversation.messages.length === 2) {
      // Generate title from first message
      conversation.title = message.length > 30 ? 
        `${message.substring(0, 30)}...` : 
        message;
    }
    
    conversation.updatedAt = Date.now();
    await conversation.save();
    
    res.json({
      message: aiResponse.message,
      conversationId: conversation._id
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: 'Error processing your message', error: error.message });
  }
};

// @desc    Get user's chat history
// @route   GET /api/chat/history
// @access  Private
const getChatHistory = async (req, res) => {
  try {
    const conversations = await ChatHistory.find({ 
      user: req.user._id 
    }).sort({ updatedAt: -1 });
    
    const formattedHistory = conversations.map(conv => ({
      id: conv._id,
      title: conv.title,
      lastMessage: conv.messages[conv.messages.length - 1]?.content.substring(0, 50) + '...',
      updatedAt: conv.updatedAt
    }));
    
    res.json(formattedHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching chat history', error: error.message });
  }
};

// @desc    Get single conversation
// @route   GET /api/chat/conversation/:id
// @access  Private
const getConversation = async (req, res) => {
  try {
    const conversation = await ChatHistory.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    res.json({
      id: conversation._id,
      title: conversation.title,
      messages: conversation.messages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching conversation', error: error.message });
  }
};

// Helper function to call the AI agent
const callAIAgent = async (message, history, memoryKeys) => {
  try {
    // Call your AI agent endpoint
    const response = await axios.post(
      'https://y344ebnmym6tlejerycybuzv.agents.do-ai.run', 
      {
        message,
        history,
        memoryKeys
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.AI_AGENT_KEY || '8jEzRmvrXlk3EPIwOmQswv67zXlGDu3n'}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return {
      message: response.data.content || response.data.response,
      memory: response.data.memory || []
    };
  } catch (error) {
    console.error('AI agent error:', error);
    return {
      message: "I'm sorry, I'm having trouble connecting at the moment. Please try again later.",
      memory: []
    };
  }
};

module.exports = {
  sendMessage,
  getChatHistory,
  getConversation
};
