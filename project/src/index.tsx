import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { ToastContainer } from 'react-toastify';
import { store } from './store';
import { fetchRooms, checkAuthAction } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(fetchRooms());
store.dispatch(checkAuthAction());

root.render(
  <React.StrictMode>
    <HistoryRouter history={browserHistory}>
      <ToastContainer />
      <App />
    </HistoryRouter>
  </React.StrictMode>,
);
