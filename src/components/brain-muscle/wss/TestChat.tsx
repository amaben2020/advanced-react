import { useEffect, useRef, useState } from 'react';

// ── Component ──
export default function TestChat({ url }: { url?: string }) {
  const [connected, setConnected] = useState(false);

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

  const handleSend = (event: any) => {
    event.preventDefault();
    if (wsRef.current?.readyState === WebSocket.OPEN)
      wsRef.current?.send('Ben the great');
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

      <form onSubmit={handleSend}>
        <input type="text" className="border p-3 rounded-2xl " />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
