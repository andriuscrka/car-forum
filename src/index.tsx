import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SSRProvider } from 'react-bootstrap';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './scss/_variables.scss';

import { App } from './App';
import { store } from './store/store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SSRProvider>
          <App />
        </SSRProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
