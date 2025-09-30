const API_BASE = process.env.REACT_APP_API_BASE || '';

// Chat API
export async function postChat(message, history) {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  if (!res.ok) throw new Error(`Chat error: ${res.status}`);
  return res.json();
}

// Memories API
export async function fetchMemories() {
  const res = await fetch(`${API_BASE}/api/memories`);
  if (!res.ok) throw new Error('Memories fetch failed');
  return res.json();
}
