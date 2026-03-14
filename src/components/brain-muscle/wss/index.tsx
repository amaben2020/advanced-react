'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ── Types ──────────────────────────────────────────────────────
type MessageType =
  | 'connected'
  | 'thinking_delta'
  | 'agent_updated'
  | 'model_fallback'
  | 'text_delta'
  | 'message_complete'
  | 'ping';

interface StreamMessage {
  message_type: MessageType;
  session_id?: string;
  delta?: string; // thinking_delta / text_delta
  agent?: string; // agent_updated
  reason?: string; // model_fallback
  fallback_model?: string;
  primary_model?: string;
}

// ── Hook ───────────────────────────────────────────────────────
const useStreamingWS = (url: string) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [events, setEvents] = useState<StreamMessage[]>([]);
  const [status, setStatus] = useState('connecting');
  const [streamedText, setStreamedText] = useState('');
  const [thinking, setThinking] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => setStatus('open');
    ws.onclose = () => setStatus('closed');
    ws.onerror = () => setStatus('error');

    ws.onmessage = (e) => {
      const msg: StreamMessage = JSON.parse(e.data);

      // Log every event so you can watch it in devtools too
      console.log('[WS]', msg.message_type, msg);

      setEvents((prev) => [...prev, msg]);

      // Handle each message type
      switch (msg.message_type) {
        case 'thinking_delta':
          setIsStreaming(true);
          setThinking((t) => t + msg.delta + '\n');
          break;
        case 'agent_updated':
          // agent switched — you'd update UI to show which agent is active
          break;
        case 'model_fallback':
          // primary model failed, show a subtle indicator
          break;
        case 'text_delta':
          // append each word as it arrives — this is the streaming text effect
          setStreamedText((t) => t + msg.delta);
          break;
        case 'message_complete':
          setIsStreaming(false);
          setThinking('');
          break;
      }
    };

    return () => ws.close();
  }, [url]);

  const sendMessage = useCallback((text: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      setStreamedText('');
      setThinking('');
      wsRef.current.send(
        JSON.stringify({ type: 'user_message', message: text }),
      );
    }
  }, []);

  return { events, status, streamedText, thinking, isStreaming, sendMessage };
};

// ── Component ──────────────────────────────────────────────────
const statusColor: Record<string, string> = {
  connecting: 'bg-yellow-500',
  open: 'bg-green-500',
  closed: 'bg-gray-500',
  error: 'bg-red-500',
};

const eventColor: Record<string, string> = {
  connected: 'text-green-400',
  thinking_delta: 'text-yellow-400',
  agent_updated: 'text-blue-400',
  model_fallback: 'text-red-400',
  text_delta: 'text-white',
  message_complete: 'text-green-400',
  ping: 'text-gray-600',
};

export default function StreamingChat() {
  const [input, setInput] = useState('');
  const eventsRef = useRef<HTMLDivElement>(null);
  const { events, status, streamedText, thinking, isStreaming, sendMessage } =
    useStreamingWS('ws://localhost:8080');

  // Auto scroll event log
  useEffect(() => {
    if (eventsRef.current) {
      eventsRef.current.scrollTop = eventsRef.current.scrollHeight;
    }
  }, [events]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 grid grid-cols-2 gap-4">
      {/* LEFT — Chat UI */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${statusColor[status]}`} />
          <span className="text-sm text-gray-400">{status}</span>
        </div>

        {/* Thinking indicator */}
        {thinking && (
          <div className="bg-gray-900 rounded-lg p-3 border border-yellow-500/30">
            <p className="text-xs text-yellow-400 mb-1">Thinking...</p>
            <p className="text-xs text-gray-400 whitespace-pre-line">
              {thinking}
            </p>
          </div>
        )}

        {/* Streamed response */}
        <div className="flex-1 bg-gray-900 rounded-lg p-4 min-h-40">
          {streamedText ? (
            <p className="text-sm leading-relaxed">
              {streamedText}
              {isStreaming && (
                <span className="inline-block w-1.5 h-4 bg-white ml-0.5 animate-pulse" />
              )}
            </p>
          ) : (
            <p className="text-gray-600 text-sm">
              Response will stream here...
            </p>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Send a message..."
            className="flex-1 px-3 py-2 rounded bg-gray-800 text-white text-sm border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={status !== 'open'}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-40 hover:bg-blue-500"
          >
            Send
          </button>
        </div>
      </div>

      {/* RIGHT — Raw event log (like DevTools Messages tab) */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-500 uppercase tracking-widest">
          Live Event Log
        </p>
        <div
          ref={eventsRef}
          className="flex-1 bg-gray-900 rounded-lg p-3 overflow-y-auto h-96 space-y-1 font-mono"
        >
          {events.map((e, i) => (
            <div key={i} className="text-xs flex gap-2">
              <span
                className={`shrink-0 ${eventColor[e.message_type] || 'text-gray-400'}`}
              >
                {e.message_type}
              </span>
              {e.delta && (
                <span className="text-gray-500 truncate">{e.delta}</span>
              )}
              {e.agent && <span className="text-gray-500">{e.agent}</span>}
              {e.reason && (
                <span className="text-gray-500 truncate">{e.reason}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
