import {
  QueryClient,
  // QueryClientContext,
  QueryClientProvider,
} from '@tanstack/react-query';
import BrainMuscle from './components/brain-muscle';
import Messages from './components/brain-muscle/messages';
import RefsApp from './components/brain-muscle/refs';
// import GoogleSearch from './components/google-search';
// import SimpleButton from './components/hoc/SimpleButton';
// import withLogging from './components/hoc/withLogging';
// import LayoutEffect from './components/layout-effect';
// import RefPage from './components/refs';
// import StaleClosures from './components/stale-closures';

function App() {
  // const ButtonLogger = withLogging(SimpleButton, { title: 'Logger Button' });
  const queryClient = new QueryClient();
  return (
    <>
      {/* <ButtonLogger name="Ben" onClick={() => console.log('clicked')} /> */}
      {/* <RefPage /> */}
      {/* <StaleClosures /> */}
      {/* <LayoutEffect /> */}
      {/* <GoogleSearch /> */}
      {/* <QueryClientProvider client={queryClient}>
        <BrainMuscle />
      </QueryClientProvider> */}
      {/* <Messages /> */}
      <RefsApp />
    </>
  );
}

export default App;
