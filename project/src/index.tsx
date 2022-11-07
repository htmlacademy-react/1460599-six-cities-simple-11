import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { mocks } from './mocks/offer';

enum Offer {
  Count = 6,
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App offerCount={Offer.Count} mockHotels={mocks} />
  </React.StrictMode>,
);
