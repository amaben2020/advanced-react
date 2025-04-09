import { useRef } from 'react';
export function usePrevious(value) {
  // your code here
  const ref = useRef({
    value,
    prev: undefined,
  });

  const currentValue = ref.current.value;

  if (value !== currentValue) {
    ref.current = {
      prev: currentValue,
      value,
    };
  }

  return ref.current.prev;
}

// if you want to try your code on the right panel
// remember to export App() component like below

export function App() {
  const previousValue = usePrevious('Ben');

  console.log(previousValue);
  return <div>your app</div>;
}
