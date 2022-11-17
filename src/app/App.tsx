import { Suspense } from 'react';

import Header from '../header/containers/Header';
import DemoAlert from '../demo/components/DemoAlert';
import Footer from './components/Footer';

import ErrorBoundary from '../common/components/ErrorBoundary';

import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/core.css';
import './css/print.css';

import Routes from './Routes';
import AutoLogin from './AutoLogin';
import ConnectionObserver from './components/ConnectionObserver';
import InternalErrorDialog from './components/InternalErrorDialog';
import IntlMessagesCreator from './components/IntlMessagesCreator';
import { isDemoMode } from '../common/utility';
import PageSpinner from './components/PageSpinner';

const App = () => {
  const main = (
    <Suspense fallback={<PageSpinner />}>
      <ErrorBoundary verbose printStack>
        <AppFC />
      </ErrorBoundary>
    </Suspense>
  );

  return main;
};

const AppFC: React.FC = () => (
  <>
    <div id='content'>
      <Header />
      {isDemoMode() && <DemoAlert />}
      <ConnectionObserver />
      <IntlMessagesCreator />
      <Routes />
    </div>
    <Footer />
    <InternalErrorDialog />
    <AutoLogin />
  </>
);

export default App;
