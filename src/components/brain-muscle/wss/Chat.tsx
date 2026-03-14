import { useState } from "react";
import { useWebSocket } from "../../../hooks/useWebSocket";

const statusColors: Record<string, string> = {
  connecting: "bg-yellow-500",
  open: "bg-green-500",
  closed: "bg-gray-500",
  error: "bg-red-500",
};

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, status, send } = useWebSocket("ws://localhost:8080");

  const handleSend = () => {
    if (!input.trim()) return;
    send(input);
    setInput("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 font-mono">
      <h2 className="text-lg font-bold text-white mb-4">WebSocket Chat</h2>

      <div className="flex items-center gap-2 mb-4">
        <span className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
        <span className="text-sm text-gray-400">{status}</span>
      </div>

      <div className="h-72 overflow-y-auto bg-gray-900 rounded p-3 mb-3 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className="text-sm">
            <span className="text-blue-400">[{msg.type}]</span>{" "}
            <span className="text-white">{msg.message || msg.original}</span>
            {msg.timestamp && (
              <span className="text-gray-500 text-xs ml-2">{msg.timestamp}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Send a message..."
          className="flex-1 px-3 py-2 rounded bg-gray-800 text-white text-sm"
        />
        <button
          onClick={handleSend}
          disabled={status !== "open"}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
}
