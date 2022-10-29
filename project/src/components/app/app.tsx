import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import RoomScreen from '../../pages/room-screen/room-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

import { Hotel } from '../../mocks/offer';
import { AppRoute } from '../../consts';

type AppProps = {
  offerCount: number;
  mockHotels: Hotel[];
}

function App(props: AppProps): JSX.Element {
  const { offerCount, mockHotels } = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={ <MainScreen offerCount={offerCount} hotels={mockHotels} /> } />
        <Route path={AppRoute.Login} element={ <LoginScreen />} />
        <Route path={`${AppRoute.Room}/:id`} element={ <RoomScreen /> } />
        <Route path='*' element={ <NotFoundScreen /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
