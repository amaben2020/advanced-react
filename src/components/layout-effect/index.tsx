import React, { useLayoutEffect, useRef, useState } from 'react';

const LayoutEffect = () => {
  const ref = useRef(null);
  const [properties, setProperties] = useState();

  useLayoutEffect(() => {
    if (ref.current) {
      const data = ref.current?.getBoundingClientRect();
      setProperties(data);
    }
  }, []);

  return (
    <div
      ref={ref}
      style={{
        border: '1px solid red',
      }}
    >
      LayoutEffect {JSON.stringify(properties)}
    </div>
  );
};

export default LayoutEffect;
