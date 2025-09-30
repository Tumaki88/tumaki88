const Memory = require('../models/Memory');

// ...existing code...

async function processUserMessage(userId, message, conversationId) {
  // ...existing code...
  
  // Check for memory patterns
  await checkAndSaveMemories(userId, message);
  
  // ...existing code...
}

async function checkAndSaveMemories(userId, message) {
  const mathPattern = /i completed math(s)? today/i;
  
  if (mathPattern.test(message)) {
    const memory = new Memory({
      userId,
      content: 'Completed math studies',
      category: 'education'
    });
    await memory.save();
    console.log('Saved math completion memory');
  }
}

async function getRelevantMemories(userId) {
  try {
    // Get recent memories, limited to 10
    return await Memory.find({ userId })
      .sort({ timestamp: -1 })
      .limit(10);
  } catch (err) {
    console.error('Error fetching memories:', err);
    return [];
  }
}

// ...existing code...

async function generateAIResponse(userId, messages, conversationId) {
  // ...existing code...
  
  // Fetch relevant memories
  const memories = await getRelevantMemories(userId);
  
  // Format memories for LLM context
  let memoryContext = '';
  if (memories.length > 0) {
    memoryContext = 'User memories:\n' + 
      memories.map(m => `- ${new Date(m.timestamp).toLocaleDateString()}: ${m.content}`).join('\n') +
      '\n\n';
  }
  
  // Add memories to LLM context
  const contextWithMemories = memoryContext + existingContext; // Assuming there's an existingContext variable
  
  // Send to LLM with enhanced context
  // ...existing code...
}

// ...existing code...

module.exports = {
  // ...existing code...
  processUserMessage,
  generateAIResponse,
  getRelevantMemories
};