import { useEffect, useRef, useState } from 'react';

// ── Component ──
export default function TestChat({ url }: { url?: string }) {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<{ type: string; message: string }[]>(
    [{ type: '', message: '' }],
  );

  const [inputMessage, setInputMessage] = useState('');

  const wsRef = useRef<WebSocket | null>(null);

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
        case 'history':
          setMessages((p) => [...p, { message: msg.data, type: 'history' }]);
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

    return () => {
      console.log('unmounted');
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

  return (
    <div
      style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'monospace' }}
    >
      <h2>WSS Test Chat</h2>

      <div
        style={{
          background: connected ? 'green' : 'red',
          width: 8,
          height: 8,
          borderRadius: '999px',
        }}
      ></div>

      <div>
        {messages.map((msg) => (
          <>
            {msg.type === 'history' ? (
              <div className="bg-gray-400">{msg.message} </div>
            ) : (
              <div className="bg-gray-700"> {msg.message} </div>
            )}
          </>
        ))}
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
