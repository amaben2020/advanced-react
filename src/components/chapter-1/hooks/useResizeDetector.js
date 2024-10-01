import { useEffect, useState } from 'react';

const useResizeDetector = () => {
  const [width, setWidth] = useState(0);
  console.log(width);
  console.log('Ran');

  useEffect(() => {
    const listener = () => {
      setWidth(window.outerWidth);
    };

    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, []);

  return null;
};

export const useModalDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  // I don't even use it, just call it here
  useResizeDetector();

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};
