/* eslint-disable react/prop-types */

import { useState } from 'react';
import { BunchOfStuff, OtherStuffAlsoComplicated } from '../mocks/mocks';
import { VerySlowComponent } from '../very-slow-component';
import './style.css';

// just hard-coded approximation to demonstrate the re-renders problem
// not to be used in real code
const getPosition = (val) => 150 - val / 2;

const MovingBlock = ({ position }) => (
  <div className="movable-block" style={{ top: position }}>
    {position}
  </div>
);

const MainScrollableArea = ({ children }) => {
  const [position, setPosition] = useState(300);
  const onScroll = (e) => {
    // calculate position based on the scrolled value
    const calculated = getPosition(e.target.scrollTop);
    // save it to state

    setPosition(calculated);
  };
  return (
    <div className="scrollable-block" onScroll={onScroll}>
      {/* pass position value to the new movable component */}

      <MovingBlock position={position} />
      {children}
    </div>
  );
};

export const ComponentsAsProps = () => {
  return (
    <MainScrollableArea>
      <>
        <VerySlowComponent />
        <BunchOfStuff />
        <OtherStuffAlsoComplicated />
      </>
    </MainScrollableArea>
  );
};
