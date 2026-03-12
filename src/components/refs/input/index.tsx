import React, { useImperativeHandle, useRef, forwardRef } from 'react';

type InputHandle = {
  focus: () => void;
};

const Input = forwardRef<
  InputHandle,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const internalRef = useRef<HTMLInputElement>(null);

  // expose controlled API via `useImperativeHandle`
  useImperativeHandle(ref, () => ({
    focus: () => internalRef.current?.focus(),
  }));

  return (
    <>
      <div style={{ display: 'block', marginTop: 30 }}>
        <input ref={internalRef} {...props} />
      </div>
    </>
  );
});

export default Input;
