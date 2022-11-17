import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import ContextProvider from '../app/components/ContextProvider';
import store from '../common/store/store';
import ThemeProvider from '../app/components/ThemeProvider';

const create = (children: React.ReactNode) => renderer.create(
  <Provider store={store}>
    <ThemeProvider />
    <ContextProvider>
      <MemoryRouter>
        { children }
      </MemoryRouter>
    </ContextProvider>
  </Provider>
);

export default create;
