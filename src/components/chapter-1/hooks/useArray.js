import { useState, useCallback } from 'react';

export function useArray(initialValue) {
  const [state, setState] = useState(initialValue);

  const push = useCallback((item) => setState((p) => [...p, item]), []);

  const removeByIndex = useCallback((index) => {
    const result = state.filter((_, idx) => Boolean(idx !== index));
    setState(result);
  }, []);

  return {
    value: state,
    push,
    removeByIndex,
  };
}

export function App() {
  const { value, removeByIndex } = useArray([1, 2, 3]);
  return (
    <div>
      {value}
      <button onClick={() => removeByIndex(1)}> Remove </button>
    </div>
  );
}
