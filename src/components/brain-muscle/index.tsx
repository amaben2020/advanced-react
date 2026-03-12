import React, { useEffect, useState } from 'react';
import useFetch from './hooks';
import SimulateSlowComponent from './simulation';
import { delay } from './simulation/utils/delay';

const BrainMuscle = () => {
  const { data } = useFetch();
  const [res, setRes] = useState('');

  useEffect(() => {
    delay(9000).then((res) => setRes(res as unknown as string));
  }, []);
  return (
    <div>
      <div>{res}</div>
      <SimulateSlowComponent />
      {JSON.stringify(data)}
    </div>
  );
};

export default BrainMuscle;
