import { useEffect, useRef, useState } from 'react';

// ── Component ──
export default function TestChat({ url }: { url?: string }) {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<{ type: string; message: string }[]>(
    [{ type: '', message: '' }],
  );
  const [inputMessage, setInputMessage] = useState('');
  const [latency, setLatency] = useState<number | null>(null);
  const pingTimestampRef = useRef<number>(0);

  const wsRef = useRef<WebSocket | null>(null);

  const scrollDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081');

    wsRef.current = ws;

    wsRef.current.onopen = () => {
      setConnected(true);
      console.log('Connected');
    };

    wsRef.current.onmessage = (event: { type: string; data: string }) => {
      console.log('BE MESSAGE', event.data);

      const msg = JSON.parse(event.data);

      switch (msg.type) {
        case 'history_bulk':
          setMessages(msg.data);
          break;
        case 'thinking':
          setMessages((p) => [...p, { message: msg.data, type: 'thinking' }]);
          break;
        case 'history':
          setMessages((p) => [...p, { message: msg.data, type: 'history' }]);
          break;
        case 'pong':
          // App-level pong: measure round-trip latency
          setLatency(Date.now() - pingTimestampRef.current);
          break;
      }
    };

    wsRef.current.onerror = (error) => {
      console.log('ERROR', error);
      setConnected(false);
    };

    wsRef.current.onclose = () => {
      console.log('Connection closed');
    };

    // App-level ping: send every 10s to measure latency
    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        pingTimestampRef.current = Date.now();
        ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 10000);

    return () => {
      console.log('unmounted');
      clearInterval(pingInterval);
      wsRef.current?.close();
      setConnected(false);
    };
  }, []);

  const handleChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSend = (event: any) => {
    event.preventDefault();
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      // sent to BE to be stored in history and db
      wsRef.current?.send(inputMessage);
      setMessages((p) => [...p, { type: 'user', message: inputMessage }]);
    }

    setInputMessage('');
  };

  useEffect(() => {
    scrollDownRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  console.log('messages ===>', messages);

  return (
    <div
      style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'monospace' }}
    >
      <h2>WSS Test Chat</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            background: connected ? 'green' : 'red',
            width: 8,
            height: 8,
            borderRadius: '999px',
          }}
        />
        {latency !== null && (
          <span style={{ fontSize: 12, color: '#888' }}>
            {latency}ms
          </span>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          padding: '12px 0',
          maxHeight: 400,
          overflowY: 'auto',
        }}
      >
        {messages
          .filter((m) => m.message)
          .map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                background:
                  msg.type === 'user'
                    ? '#2563eb'
                    : msg.type === 'thinking'
                      ? '#d4d4d4'
                      : '#374151',
                color: '#fff',
                padding: '8px 14px',
                borderRadius:
                  msg.type === 'user'
                    ? '16px 16px 4px 16px'
                    : '16px 16px 16px 4px',
                maxWidth: '75%',
                fontSize: 14,
              }}
            >
              {msg.message}
            </div>
          ))}
        <div ref={scrollDownRef} />
      </div>

      <form onSubmit={handleSend}>
        <input
          type="text"
          className="border p-3 rounded-2xl "
          onChange={handleChange}
          value={inputMessage}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
