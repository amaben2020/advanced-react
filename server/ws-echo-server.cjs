// Simple echo WebSocket server
// Run: node server/ws-echo-server.cjs
const { WebSocketServer, WebSocket } = require('ws'); // add WebSocket

const wss = new WebSocketServer({ port: 8081 });
console.log('Echo server running on ws://localhost:8081');

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  ws.on('message', (data) => {
    console.log('received from client', data?.toString());

    ws.send(JSON.stringify({ type: 'history', data: data?.toString() }));

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // client.send(data, { binary: isBinary });
        client.send('Client connected successfully');
      }
    });
  });

  ws.on('close', () => {
    console.log('Closing....');
  });

  // ws.send('Echo from server');
});

// const { WebSocketServer, WebSocket } = require('ws');
// const wss = new WebSocketServer({ port: 8081 });

// ── helpers ──────────────────────────────────────────────
const send = (ws, type, data = null) => ws.send(JSON.stringify({ type, data }));

const broadcast = (excludeWs, type, data = null) =>
  wss.clients.forEach((c) => {
    if (c !== excludeWs && c.readyState === WebSocket.OPEN)
      c.send(JSON.stringify({ type, data }));
  });

// ── ping/pong — keepalive ─────────────────────────────────
// Without this, idle connections silently die (load balancers,
// mobile networks, etc. drop connections after ~60s of silence)
// const PING_INTERVAL = 30_000;

// const heartbeat = setInterval(() => {
//   wss.clients.forEach((ws) => {
//     if (!ws.isAlive) return ws.terminate(); // didn't pong back → kill it
//     ws.isAlive = false;
//     ws.ping(); // send native WS ping frame
//   });
// }, PING_INTERVAL);

// wss.on('close', () => clearInterval(heartbeat)); // cleanup on server shutdown

// // ── connection ────────────────────────────────────────────
// wss.on('connection', (ws) => {
//   ws.isAlive = true;
//   ws.on('pong', () => {
//     ws.isAlive = true;
//   }); // client responded → still alive

//   ws.on('error', console.error);

//   ws.on('message', async (raw) => {
//     let parsed;
//     try {
//       parsed = JSON.parse(raw.toString());
//     } catch {
//       return send(ws, 'error', 'invalid JSON');
//     }

//     const { type, data } = parsed;

//     switch (type) {
//       // ── client asks for message history ──
//       case 'get_history': {
//         send(ws, 'loading', true); // 1. tell client: loading
//         const rows = await db.query(
//           // 2. hit postgres
//           'SELECT * FROM messages ORDER BY created_at DESC LIMIT 50',
//         );
//         send(ws, 'history', rows); // 3. send the rows
//         send(ws, 'loading', false); // 4. done loading
//         break;
//       }

//       // ── client sends a chat message ──
//       case 'message': {
//         const saved = await db.query(
//           // save to postgres first
//           'INSERT INTO messages (text) VALUES ($1) RETURNING *',
//           [data.text],
//         );
//         broadcast(null, 'message', saved.rows[0]); // broadcast to ALL including sender
//         break;
//       }

//       // ── client asks Claude a question ──
//       case 'ask_ai': {
//         send(ws, 'thinking', true); // show spinner in UI

//         // Claude streaming — each chunk fires as it arrives
//         const stream = await anthropic.messages.stream({
//           model: 'claude-opus-4-5',
//           messages: [{ role: 'user', content: data.prompt }],
//         });

//         for await (const chunk of stream) {
//           send(ws, 'ai_chunk', chunk.delta?.text); // stream each token live
//         }

//         send(ws, 'thinking', false); // hide spinner
//         send(ws, 'ai_done', null); // signal completion
//         break;
//       }

//       // ── client ping (app-level, different from WS native ping) ──
//       case 'ping': {
//         send(ws, 'pong', Date.now()); // echo timestamp back
//         break;
//       }
//     }
//   });

//   ws.on('close', () => {
//     ws.isAlive = false;
//     console.log('Client disconnected');
//   });
// });
