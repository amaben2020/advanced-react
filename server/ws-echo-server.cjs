// Simple echo WebSocket server
// Run: node server/ws-echo-server.cjs
const { WebSocketServer, WebSocket } = require('ws'); // add WebSocket

const wss = new WebSocketServer({ port: 8081 });
console.log('Echo server running on ws://localhost:8081');

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  ws.on('message', (data) => {
    console.log('received from client', data);
    ws.send('Echo from server 1');

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
