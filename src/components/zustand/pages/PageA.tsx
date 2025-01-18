import React, { useEffect, useState } from 'react';
import { useForm } from '../store';

import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

const Emitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
};

Object.freeze(Emitter);

const EVENT_NAME = 'INPUT_FROM_MAIN';

// Component 1
function Header() {
  const [state, setState] = useState({
    header: 'Default header',
  });

  useEffect(() => {
    Emitter.once(EVENT_NAME, (newValue) => setState({ header: newValue }));
    return () => {
      Emitter.off(EVENT_NAME);
    };
  }, [state.header]);

  return (
    <div>
      <h1>{state.header}</h1>
      <p>Header listens only to the first occurence new input.</p>
    </div>
  );
}

// Component 2
function Main() {
  const [state, setState] = useState({ inputValue: '' });
  const [checkboxState, setCheckBoxState] = useState('false');

  const handleOnClick = (e) => {
    Emitter.emit(EVENT_NAME, state.inputValue);
  };

  const handleOnChange = (e) => {
    setCheckBoxState(!checkboxState);
  };

  return (
    <div>
      <h3>Main Content</h3>
      <input
        type="text"
        value={state.inputValue}
        onChange={(e) => setState({ inputValue: e.target.value })}
      />
      <input
        type="button"
        value="Send to other components"
        onClick={handleOnClick}
      />
      <input
        type="checkbox"
        value="Test"
        checked={checkboxState}
        onChange={handleOnChange}
      />
    </div>
  );
}

const PageA = () => {
  const { update } = useForm();
  return (
    <div
      style={{
        border: '1px solid red',
        padding: 30,
      }}
    >
      PageA <button onClick={() => update(20)}>Update</button>
      <Header />
      <Main />
    </div>
  );
};

export default PageA;
