import { Suspense } from 'react';

import Header from '../header/containers/Header';
import DemoAlert from '../demo/components/DemoAlert';
import Footer from './components/Footer';

import ErrorBoundary from '../common/components/ErrorBoundary';

import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/core.css';
import './css/print.css';
import './css/404.css';

import Routes from './Routes';
import AuthObserver from '../account/containers/AuthObserver';
import ConnectionObserver from './components/ConnectionObserver';
import InternalErrorDialog from './components/InternalErrorDialog';
import IntlMessagesCreator from './components/IntlMessagesCreator';
import { isDemoMode } from '../common/utility';
import PageSpinner from './components/PageSpinner';
import PageScroller from '../common/components/PageScroller';
import LoginModal from '../account/containers/LoginModal';
import LogoutModal from '../account/containers/LogoutModal';

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
    <AuthObserver />
    <LoginModal />
    <LogoutModal />
    <PageScroller />
  </>
);

export default App;
