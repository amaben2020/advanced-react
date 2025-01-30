import React, { useEffect, useReducer } from 'react';

const INITIAL_STATE = { count: 0, firstName: 'Ben' };

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1, firstName: 'Ben' };

    case 'DECREMENT': {
      if (state.count === 0) {
        return { count: 0, firstName: 'Ben' };
      }

      return { count: state.count - 1, firstName: 'Ben' };
    }

    case 'UPDATE_NAME': {
      if (state.count > 3) {
        return { ...state, firstName: 'Benoski' };
      }

      return { count: state.count - 1 };
    }

    default:
      throw new Error();
  }
};

const ReducerComponent = () => {
  const [{ count, firstName }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE,
    () => ({
      count: 3,
    })
  );

  useEffect(() => {
    if (count > 3) {
      dispatch({ type: 'UPDATE_NAME' });
    }
  }, [count]);

  return (
    <div>
      <p>{count}</p>

      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>

      <p>{firstName}</p>
    </div>
  );
};

export default ReducerComponent;
