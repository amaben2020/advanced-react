import { useEffect, useState } from 'react';

const SimulateSlowComponent = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!ready) return <div>Loading...</div>;

  return <div>SimulateSlowComponent</div>;
};

export default SimulateSlowComponent;
