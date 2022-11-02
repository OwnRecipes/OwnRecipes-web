// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import Root from './app/Root';

import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  // <StrictMode>
  <Root />
  // </StrictMode>
);

serviceWorker.unregister();
