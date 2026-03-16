// Simple echo WebSocket server with SQLite
// Run: node server/ws-echo-server.cjs
const { WebSocketServer, WebSocket } = require('ws');
const Database = require('better-sqlite3');
const path = require('path');

// ── SQLite setup ──
const db = new Database(path.join(__dirname, 'chat.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

const insertMsg = db.prepare(
  'INSERT INTO messages (type, message) VALUES (?, ?)',
);
const getHistory = db.prepare(
  'SELECT type, message FROM messages ORDER BY id ASC',
);

// ── Mock replies ──
const replies = [
  'Got it, thanks!',
  'Interesting, tell me more.',
  'I totally agree with that.',
  'Hmm, let me think about it...',
  'That makes sense!',
  'Could you elaborate on that?',
  'Nice one!',
  'I see what you mean.',
  "That's a great point!",
  'Let me get back to you on that.',
];

// ── WebSocket server ──
const wss = new WebSocketServer({ port: 8081 });
console.log('Echo server running on ws://localhost:8081');

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  // Send full chat history on connect
  const history = getHistory.all();
  ws.send(JSON.stringify({ type: 'history_bulk', data: history }));

  // ws.send triggers ws.message on another side
  ws.on('message', (data) => {
    const text = data?.toString();
    console.log('received from client:', text);

    // Store user message
    insertMsg.run('user', text);

    // Pick a random reply, store it, send it back, could be ai and you must store the processed info into db before sending to client
    const reply = replies[Math.floor(Math.random() * replies.length)];
    insertMsg.run('history', reply);

    ws.send(JSON.stringify({ type: 'history', data: reply }));
  });

  ws.on('close', () => {
    console.log('Closing....');
  });
});

// const { WebSocketServer, WebSocket } = require('ws');
// const wss = new WebSocketServer({ port: 8081 });

// ── helpers ──────────────────────────────────────────────
// const send = (ws, type, data = null) => ws.send(JSON.stringify({ type, data }));

// const broadcast = (excludeWs, type, data = null) =>
//   wss.clients.forEach((c) => {
//     if (c !== excludeWs && c.readyState === WebSocket.OPEN)
//       c.send(JSON.stringify({ type, data }));
//   });

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
