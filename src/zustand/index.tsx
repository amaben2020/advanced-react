import React from 'react';
import useCounter from './store';

const Zustander = () => {
  const { count, updateCount } = useCounter();

  console.log(count);
  return (
    <div>
      Zustander
      {count}
      <button onClick={() => updateCount()}></button>
    </div>
  );
};

export default Zustander;
