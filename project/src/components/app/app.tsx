import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import RoomScreen from '../../pages/room-screen/room-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

import { store } from '../../store';

import { AppRoute } from '../../const';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Routes>
        <Route path={AppRoute.Root} element={ <MainScreen /> } />
        <Route path={AppRoute.Login} element={ <LoginScreen />} />
        <Route path={`${AppRoute.Room}/:id`} element={ <RoomScreen /> } />
        <Route path='*' element={ <NotFoundScreen /> } />
      </Routes>
    </Provider>
  );
}

export default App;
