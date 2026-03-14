// npm install ws
// node server/ws-stream-server.js

const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });
console.log('WebSocket server running on ws://localhost:8080');

// Helper — send a message with a delay
const send = (ws, data, delay) =>
  new Promise((res) =>
    setTimeout(() => {
      if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(data));
      res();
    }, delay),
  );

// Simulate a streaming AI response sequence
const streamResponse = async (ws, sessionId) => {
  // 1. Agent starts thinking
  await send(
    ws,
    {
      message_type: 'thinking_delta',
      session_id: sessionId,
      delta: 'Analyzing your request...',
    },
    200,
  );
  await send(
    ws,
    {
      message_type: 'thinking_delta',
      session_id: sessionId,
      delta: 'Searching knowledge base...',
    },
    600,
  );
  await send(
    ws,
    {
      message_type: 'thinking_delta',
      session_id: sessionId,
      delta: 'Generating response...',
    },
    1000,
  );

  // 2. Agent updated (picked a model/agent)
  await send(
    ws,
    {
      message_type: 'agent_updated',
      session_id: sessionId,
      agent: 'searchatlas_keywords',
    },
    1400,
  );

  // 3. Try primary model — simulate it failing (model_fallback)
  await send(
    ws,
    {
      message_type: 'model_fallback',
      session_id: sessionId,
      primary_model: 'openrouter/google/gemini-2.5-flash',
      fallback_model: 'openrouter/openai/gpt-4.1',
      reason: 'ServiceUnavailableError: MidStreamFail',
      message_id: `msg-${Math.random().toString(36).slice(2, 10)}`,
    },
    1800,
  );

  // 4. Stream the actual text response word by word
  const words =
    'Here are the top keywords for your query. Focus on long-tail variations with low difficulty scores.'.split(
      ' ',
    );
  for (let i = 0; i < words.length; i++) {
    await send(
      ws,
      {
        message_type: 'text_delta',
        session_id: sessionId,
        delta: words[i] + (i < words.length - 1 ? ' ' : ''),
      },
      1900 + i * 80,
    );
  }

  // 5. Done
  await send(
    ws,
    { message_type: 'message_complete', session_id: sessionId },
    1900 + words.length * 80,
  );
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  const sessionId = Math.random().toString(36).slice(2, 18);

  // Send welcome
  ws.send(JSON.stringify({ message_type: 'connected', session_id: sessionId }));

  // Heartbeat ping every 5s (that's the {type: "ping"} you saw in devtools)
  const pingInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type: 'ping' }));
    }
  }, 5000);

  // When client sends a message, stream a fake AI response
  ws.on('message', (data) => {
    const parsed = JSON.parse(data.toString());
    console.log('Received:', parsed);

    if (parsed.type === 'user_message') {
      streamResponse(ws, sessionId);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(pingInterval);
  });

  ws.on('error', console.error);
});
