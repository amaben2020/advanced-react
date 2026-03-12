import { useRef } from 'react';
import Input from './input';

const RefPage = () => {
  const inputRef = useRef<{ focus: () => void }>(null);
  const handleFocus = () => inputRef.current?.focus();

  return (
    <div>
      Page for Refs
      <div>
        <button onClick={handleFocus}>Focus The Input</button>
        <Input ref={inputRef} />
      </div>
    </div>
  );
};

export default RefPage;
