import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
// import Rerenders from './components/chapter-1/Rerenders';
import { ComponentsAsProps } from './components/chapter-2';
import ModalDiag from './components/chapter-3/dialog';
import ThreeColsLayout from './components/chapter-3/three-cols-layout';
import ExpensiveComponent from './components/chapter-4';
import { AuthCTX } from './components/context';
import { WeatherDashboard } from './components/interview/Question';
import OptimisticUpdates from './components/optimistic-updates';
import AllPages from './components/zustand/pages/AllPages';
import { ModalDialog } from './components/basic-modal-dialog';
import { useState } from 'react';
import {
  AnotherVerySlowComponent,
  VerySlowComponent,
} from './components/very-slow-component';
import { UIEvent } from 'react';
import React from 'react';

export const queryClient = new QueryClient();
function App() {
  return (
    <AuthCTX>
      {/* <Rerenders /> */}
      {/* <ComponentsAsProps />

      <ModalDiag />

      <ThreeColsLayout />

      <ExpensiveComponent />

      <WeatherDashboard /> */}

      <div
        style={{
          border: 1,
          padding: 20,
        }}
      >
        {/* <QueryClientProvider client={queryClient}>
          <OptimisticUpdates />
        </QueryClientProvider> */}
      </div>
      {/* <AllPages /> */}

      <Composer>
        <VerySlowComponent />
        <AnotherVerySlowComponent />
      </Composer>
    </AuthCTX>
  );
}

export default App;

const MovableBlock = ({ position }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        left: 10,
        background: 'green',
        padding: 10,
      }}
    >
      {position}px
    </div>
  );
};

const Composer = ({ children }) => {
  const [position, setPosition] = useState(0);

  const handleScroll = (e) => {
    // if (e.target.scrollTop) {
    setPosition(e.target.scrollTop);
    // }
  };

  return (
    <div
      onScroll={handleScroll}
      style={{
        height: 150,
        border: '2px solid red',
        scrollbarColor: 'revert',
        overflow: 'scroll',
        position: 'relative',
      }}
    >
      <MovableBlock position={position} />
      {children}
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi et
      numquam hic quos accusamus, asperiores officiis facere consequuntur
      voluptatum repellat similique odit nostrum nisi beatae, quaerat animi enim
      deleniti cumque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Excepturi et numquam hic quos accusamus, asperiores officiis facere
      consequuntur voluptatum repellat similique odit nostrum nisi beatae,
      quaerat animi enim deleniti cumque. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Excepturi et numquam hic quos accusamus, asperiores
      officiis facere consequuntur voluptatum repellat similique odit nostrum
      nisi beatae, quaerat animi enim deleniti cumque. Lorem ipsum dolor sit
      amet consectetur adipisicing elit. Excepturi et numquam hic quos
      accusamus, asperiores officiis facere consequuntur voluptatum repellat
      similique odit nostrum nisi beatae, quaerat animi enim deleniti cumque.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi et
      numquam hic quos accusamus, asperiores officiis facere consequuntur
      voluptatum repellat similique odit nostrum nisi beatae, quaerat animi enim
      deleniti cumque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Excepturi et numquam hic quos accusamus, asperiores officiis facere
      consequuntur voluptatum repellat similique odit nostrum nisi beatae,
      quaerat animi enim deleniti cumque. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Excepturi et numquam hic quos accusamus, asperiores
      officiis facere consequuntur voluptatum repellat similique odit nostrum
      nisi beatae, quaerat animi enim deleniti cumque. Lorem ipsum dolor sit
      amet consectetur adipisicing elit. Excepturi et numquam hic quos
      accusamus, asperiores officiis facere consequuntur voluptatum repellat
      similique odit nostrum nisi beatae, quaerat animi enim deleniti cumque.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi et
      numquam hic quos accusamus, asperiores officiis facere consequuntur
      voluptatum repellat similique odit nostrum nisi beatae, quaerat animi enim
      deleniti cumque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Excepturi et numquam hic quos accusamus, asperiores officiis facere
      consequuntur voluptatum repellat similique odit nostrum nisi beatae,
      quaerat animi enim deleniti cumque. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Excepturi et numquam hic quos accusamus, asperiores
      officiis facere consequuntur voluptatum repellat similique odit nostrum
      nisi beatae, quaerat animi enim deleniti cumque.
    </div>
  );
};
