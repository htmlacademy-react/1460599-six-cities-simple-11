import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import RoomScreen from '../../pages/room-screen/room-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

import { store } from '../../store';

import { AppRoute } from '../../consts';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={ <MainScreen /> } />
          <Route path={AppRoute.Login} element={ <LoginScreen />} />
          <Route path={`${AppRoute.Room}/:id`} element={ <RoomScreen /> } />
          <Route path='*' element={ <NotFoundScreen /> } />
        </Routes>
      </HistoryRouter>
    </Provider>
  );
}

export default App;
