import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';

dotenv.config();

const filePath = process.env.MEMORY_FILE || './data/memories.json';

// Ensure directory exists
const dir = path.dirname(filePath);
if (!fs.existsSync(dir)) {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (err) {
    console.error('Failed to create directory:', err);
  }
}

let state = {
  messages: [],
  memories: []
};

// Load existing data if available
if (fs.existsSync(filePath)) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed?.memories) state = parsed;
  } catch (e) {
    console.warn('Could not parse memory file, starting fresh:', e);
  }
}

function persist() {
  try {
    fs.writeFileSync(filePath, JSON.stringify(state, null, 2));
  } catch (e) {
    console.error('Failed to write memory file:', e);
  }
}

export function addMessagePair(pair) {
  if (!pair?.user || !pair?.assistant) return;
  
  state.messages.push({
    id: nanoid(),
    user: pair.user,
    assistant: pair.assistant,
    createdAt: new Date().toISOString()
  });
  
  // Prune if too many messages
  if (state.messages.length > 2000) state.messages.splice(0, 100);
  
  persist();
}

function summarize(userMessage, assistantReply) {
  const trimmed = userMessage.split(/\s+/).slice(0, 12).join(' ');
  return `${trimmed}${userMessage.split(/\s+/).length > 12 ? '…' : ''}`;
}

export function createMemoryFromUser(userMessage, assistantReply) {
  // Simple heuristic: only create memory if message length > 20 chars
  if (!userMessage || userMessage.length < 20) return;
  
  const summary = summarize(userMessage, assistantReply);
  state.memories.push({
    id: nanoid(),
    title: summary,
    excerpt: assistantReply
      ? assistantReply.split(/\s+/).slice(0, 28).join(' ') + (assistantReply.split(/\s+/).length > 28 ? '…' : '')
      : summary,
    createdAt: new Date().toISOString()
  });
  
  // Prune if too many memories
  if (state.memories.length > 500) state.memories.splice(0, 50);
  
  persist();
}

export function listMemories() {
  return state.memories.slice().reverse();
}
