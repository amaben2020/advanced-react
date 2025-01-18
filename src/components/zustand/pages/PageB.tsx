import React from 'react';
import { useForm } from '../store';

const PageB = () => {
  const { count } = useForm();
  return (
    <div
      style={{
        border: '1px solid green',
        padding: 30,
      }}
    >
      PageB {count}
    </div>
  );
};

export default PageB;
