// Simple echo WebSocket server
// Run: node server/ws-echo-server.cjs
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8081 });
console.log('Echo server running on ws://localhost:8081');

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  ws.on('message', (data) => {
    console.log('received from client', data);
  });

  ws.send('Echo from server');
});
