import React, { useState, useMemo, FormEvent, useCallback } from 'react';

// A function that simulates a task that takes ~7ms to compute
const expensiveComputation = (num) => {
  const start = performance.now(); // Record the start time
  let result = 0;
  while (performance.now() - start < 7) {
    result += Math.sqrt(num) * Math.random(); // Do some heavy calculations
  }
  return result;
};

const useForm = () => {
  const [form, setForm] = useState('');

  const handleSubmit = useCallback((e: FormEvent) => {
    return form;
  }, []);

  return handleSubmit;
};

const ExpensiveComponent = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false);

  // this doesnt get recreated on rerenders
  const handleSubmit = useForm();

  // Use useMemo to memoize the result of expensive computation
  const computedValue = useMemo(() => {
    return expensiveComputation(count);
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Expensive Computation Result: {computedValue}</h2>

      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setOtherState(!otherState)}>
        Toggle Other State
      </button>
      <p>Other state: {otherState ? 'True' : 'False'}</p>
    </div>
  );
};

export default ExpensiveComponent;
