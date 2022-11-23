import { Suspense } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import PageSpinner from './components/PageSpinner';
import store from '../common/store/store';
import ContextProvider from './components/ContextProvider';
import ThemeProvider from './components/ThemeProvider';
import App from './App';
import { isDemoMode } from '../common/utility';

const basename = process.env.PUBLIC_URL;

const Root = () => (
  <Suspense fallback={<PageSpinner />}>
    <Provider store={store}>
      <ThemeProvider />
      <ContextProvider>
        {!isDemoMode() && <BrowserRouter basename={basename}><App /></BrowserRouter>}
        { isDemoMode() && <HashRouter><App /></HashRouter>}
      </ContextProvider>
    </Provider>
  </Suspense>
);

export default Root;
