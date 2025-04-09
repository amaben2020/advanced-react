import { Ref, useCallback, useEffect, useState } from 'react';

export function useHover() {
  const [isHovered, setIsHovered] = useState(false);
  const [node, setNode] = (useState < T) | (null > null);

  const ref = useCallback((node) => {
    setNode(node);
    setIsHovered(false);
  }, []);

  useEffect(() => {
    if (!node) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);

      // Reset hover state on cleanup
      setIsHovered(false);
    };
  }, [node]);

  return [ref, isHovered];
}

// if you want to try your code on the right panel
// remember to export App() component like below

export function App() {
  const [ref, isHovered] = useHover();
  return <div ref={ref}>{isHovered ? 'hovered' : 'not hovered'}</div>;
}
