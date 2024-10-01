import { useEffect, useState } from 'react';

export const useMediaQuery = () => {
  const [matches, setMatches] = useState({
    matches: window.innerWidth > 768 ? true : false,
  });
  useEffect(() => {
    let matchMedia = window.matchMedia('(min-width: 768px)');
    matchMedia.addEventListener('change', setMatches);

    return () => {
      matchMedia.removeEventListener('change', setMatches);
    };
  }, []);

  console.log(matches);

  return matches;
};
