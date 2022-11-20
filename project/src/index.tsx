import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store';
import { fetchQuestionAction } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(fetchQuestionAction());

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
