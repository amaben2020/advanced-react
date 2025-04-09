import { useRef } from 'react';
export function useIsFirstRender() {
  // your code here

  const isFirstRender = useRef(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;

    return true;
  }

  return false;
}

// if you want to try your code on the right panel
// remember to export App() component like below

export function App() {
  const isFirstRender = useIsFirstRender();

  if (!isFirstRender) {
    return null;
  }

  return <div>your app</div>;
}
