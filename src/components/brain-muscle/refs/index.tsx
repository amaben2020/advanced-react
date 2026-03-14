import { useRef, useState, useEffect } from 'react';

// ============================================================
// 1. TABS
// ============================================================
const Tabs = () => {
  // do the current and prev using ref without rerender

  const ref = useRef('home');

  const [currentTab, setCurrentTab] = useState('');
  const tabsApi = [
    {
      id: 1,
      name: 'Home',
    },
    {
      id: 2,
      name: 'Away',
    },
  ];

  const handleSelect = (tab: string) => {
    ref.current = currentTab;
    setCurrentTab(tab);
  };

  return (
    <div>
      {tabsApi.map(({ name: tab }) => (
        <div className="border" onClick={() => handleSelect(tab)}>
          {tab}
        </div>
      ))}
      <div className="border">
        <p>Prev: </p>
        {ref.current}
      </div>
    </div>
  );
};

// ============================================================
// 2. FOCUS MANAGEMENT
// ============================================================
const FocusModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="px-3 py-1 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-500"
      >
        {isOpen ? 'Close Modal' : 'Open Modal'}
      </button>
      {isOpen && (
        <div className="mt-3 p-3 bg-gray-700 rounded">
          <p className="text-sm text-gray-400 mb-2">Input is auto-focused 👇</p>
          <input
            ref={inputRef}
            placeholder="auto-focused!"
            className="w-full px-3 py-1 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
      )}
    </div>
  );
};

// ============================================================
// 3. STOPWATCH
// ============================================================
const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => setTime((t) => t + 1), 1000);
  };

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  return (
    <div>
      <p className="text-3xl font-mono text-white mb-3">{time}s</p>
      <div className="flex gap-2">
        <button
          onClick={start}
          className="px-3 py-1 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-500"
        >
          Start
        </button>
        <button
          onClick={stop}
          className="px-3 py-1 rounded text-sm font-medium bg-red-600 text-white hover:bg-red-500"
        >
          Stop
        </button>
        <button
          onClick={reset}
          className="px-3 py-1 rounded text-sm font-medium bg-gray-600 text-white hover:bg-gray-500"
        >
          Reset
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        intervalId lives in a ref — no extra rerenders
      </p>
    </div>
  );
};

// ============================================================
// 4. RENDER COUNTER
// ============================================================
const RenderCounter = () => {
  const [count, setCount] = useState(0);
  const renders = useRef(0);
  renders.current++;

  return (
    <div>
      <div className="flex gap-6 mb-3">
        <div className="text-center">
          <p className="text-2xl font-mono text-blue-400">{count}</p>
          <p className="text-xs text-gray-400">state count</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-mono text-yellow-400">
            {renders.current}
          </p>
          <p className="text-xs text-gray-400">total renders</p>
        </div>
      </div>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="px-3 py-1 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-500"
      >
        Increment state
      </button>
      <p className="text-xs text-gray-500 mt-2">
        renders.current++ never triggers a rerender itself
      </p>
    </div>
  );
};

// ============================================================
// 5. STALE CLOSURE FIX
// ============================================================
const StaleClosureFix = () => {
  const [name, setName] = useState('');
  const nameRef = useRef(name);

  useEffect(() => {
    nameRef.current = name;
  }, [name]);

  const handleAlert = () => {
    setTimeout(() => alert(`Hello ${nameRef.current || '(empty)'}`), 3000);
  };

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type a name..."
        className="w-full px-3 py-1 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-blue-500 text-sm mb-3"
      />
      <button
        onClick={handleAlert}
        className="px-3 py-1 rounded text-sm font-medium bg-purple-600 text-white hover:bg-purple-500"
      >
        Alert in 3s
      </button>
      <p className="text-xs text-gray-500 mt-2">
        Click, then quickly change the name — ref reads the latest value
      </p>
    </div>
  );
};

// ============================================================
// 6. SCROLL TO BOTTOM
// ============================================================
const Chat = () => {
  const [messages, setMessages] = useState<string[]>(['Hey!', "What's up?"]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      <div className="h-36 overflow-y-auto bg-gray-900 rounded p-3 mb-3 flex flex-col gap-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-sm px-3 py-1 rounded-full w-fit ${i % 2 === 0 ? 'bg-blue-600 text-white self-start' : 'bg-gray-600 text-white self-end'}`}
          >
            {m}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <button
        onClick={() => setMessages((ms) => [...ms, `Message ${ms.length + 1}`])}
        className="px-3 py-1 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-500"
      >
        Add message
      </button>
      <p className="text-xs text-gray-500 mt-2">
        bottomRef anchors the scroll target — no state needed
      </p>
    </div>
  );
};

// ============================================================
// MAIN PLAYGROUND
// ============================================================
const sections = [
  {
    id: 1,
    title: 'Tab Switching',
    subtitle: 'Track previous tab without rerender',
    component: <Tabs />,
  },
  {
    id: 2,
    title: 'Focus Management',
    subtitle: 'Auto-focus DOM element on condition',
    component: <FocusModal />,
  },
  {
    id: 3,
    title: 'Stopwatch',
    subtitle: 'Store interval ID in ref, not state',
    component: <Stopwatch />,
  },
  {
    id: 4,
    title: 'Render Counter',
    subtitle: 'Count renders without causing one',
    component: <RenderCounter />,
  },
  {
    id: 5,
    title: 'Stale Closure Fix',
    subtitle: 'Ref always reads latest value in async',
    component: <StaleClosureFix />,
  },
  {
    id: 6,
    title: 'Scroll to Bottom',
    subtitle: 'DOM anchor for chat/feed UIs',
    component: <Chat />,
  },
];

export default function RefsApp() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-1">useRef Playground</h1>
      <p className="text-gray-400 text-sm mb-8">
        useRef = a box that holds a value without triggering a rerender
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s) => (
          <div key={s.id} className="bg-gray-800 rounded-xl p-5">
            <div className="mb-4">
              <span className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
                #{s.id}
              </span>
              <h2 className="text-base font-semibold mt-1">{s.title}</h2>
              <p className="text-xs text-gray-400">{s.subtitle}</p>
            </div>
            {s.component}
          </div>
        ))}
      </div>
    </div>
  );
}
