import { Router } from 'express';
import fetch from 'node-fetch';
import { addMessagePair, createMemoryFromUser } from '../store/memoryStore.js';

const router = Router();

// Helper: normalize base endpoint (remove any accidental path pieces)
function buildAgentEndpoint(raw) {
  if (!raw) return null;
  let base = raw.trim();
  // Remove trailing slashes
  base = base.replace(/\/+$/,'');
  // Strip any of these suffix variants if user pasted a full path
  base = base.replace(/(\/api\/v1\/chat\/completions|\/api\/v1\/chat|\/api\/v1|\/chat)$/,'');
  return base + '/api/v1/chat/completions';
}

router.post('/', async (req, res) => {
  try {
    const { message, history, messages, temperature, top_p, max_tokens } = req.body || {};

    if (!process.env.AI_AGENT_KEY) {
      return res.status(500).json({ error: 'AI agent key not configured' });
    }
    if (!process.env.AI_AGENT_ENDPOINT) {
      return res.status(500).json({ error: 'AI agent endpoint not configured' });
    }

    let aiMessages = messages;
    if (!aiMessages && message) {
      aiMessages = [...(history || []), { role: 'user', content: message }];
    }
    if (!aiMessages || !Array.isArray(aiMessages) || !aiMessages.length) {
      return res.status(400).json({ error: 'No valid message content provided' });
    }

    const endpoint = buildAgentEndpoint(process.env.AI_AGENT_ENDPOINT);
    if (!endpoint) return res.status(500).json({ error: 'Failed to build agent endpoint' });

    // Build request body per DigitalOcean spec
    const body = {
      messages: aiMessages,
      stream: false,
      include_functions_info: false,
      include_retrieval_info: false,
      include_guardrails_info: false
    };
    if (temperature !== undefined) body.temperature = temperature;
    if (top_p !== undefined) body.top_p = top_p;
    if (max_tokens !== undefined) body.max_tokens = max_tokens;

    if (process.env.DEBUG_AI === '1') {
      console.log('[Tumaki][AI] POST ->', endpoint);
      console.log('[Tumaki][AI] Payload preview:', JSON.stringify({ ...body, messages: body.messages.slice(-3) }, null, 2));
    }

    const agentRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AI_AGENT_KEY}`
      },
      body: JSON.stringify(body)
    });

    const rawText = await agentRes.text();
    let data;
    try { data = JSON.parse(rawText); } catch { data = { choices: [{ message: { content: rawText } }] }; }

    if (!agentRes.ok) {
      const agentError =
        data?.error ||
        data?.detail ||
        data?.message ||
        (typeof data === 'string' ? data : rawText) ||
        'AI agent error';

      // Attempt health probe for extra diagnostics when 404 or 401
      if (process.env.DEBUG_AI === '1') {
        try {
          const healthBase = buildAgentEndpoint(process.env.AI_AGENT_ENDPOINT).replace(/\/api\/v1\/chat\/completions$/, '/health');
          const healthRes = await fetch(healthBase);
          const healthText = await healthRes.text();
          console.log('[Tumaki][AI] Health probe', healthBase, healthRes.status, healthText);
        } catch (e) {
          console.log('[Tumaki][AI] Health probe failed:', e.message);
        }
      }

      console.error('AI Agent error:', agentError, data);
      return res.status(agentRes.status).json({
        error: agentError,
        hint: 'Verify AI_AGENT_ENDPOINT base (no /chat appended) and key validity'
      });
    }

    const reply =
      data?.choices?.[0]?.message?.content ||
      data?.response ||
      data?.message ||
      "I couldn't generate a proper response.";

    const userContent = message || aiMessages.find(m => m.role === 'user')?.content;
    if (userContent) {
      addMessagePair({ user: userContent, assistant: reply });
      createMemoryFromUser(userContent, reply);
    }

    if (messages) {
      return res.json(data);
    }
    return res.json({ response: reply });
  } catch (e) {
    console.error('Chat proxy error:', e);
    res.status(500).json({ error: 'Server error contacting AI agent' });
  }
});

export default router;
