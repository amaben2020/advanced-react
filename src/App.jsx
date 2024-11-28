import './App.css';
// import Rerenders from './components/chapter-1/Rerenders';
import { ComponentsAsProps } from './components/chapter-2';
import ModalDiag from './components/chapter-3/dialog';
import ThreeColsLayout from './components/chapter-3/three-cols-layout';
import ExpensiveComponent from './components/chapter-4';
import { AuthCTX } from './components/context';
import { WeatherDashboard } from './components/interview/Question';

function App() {
  return (
    <AuthCTX>
      {/* <Rerenders /> */}
      <ComponentsAsProps />

      <ModalDiag />

      <ThreeColsLayout />

      <ExpensiveComponent />

      <WeatherDashboard />
    </AuthCTX>
  );
}

export default App;
