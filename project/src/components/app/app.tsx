import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import RoomScreen from '../../pages/room-screen/room-screen';
import NotFound from '../../pages/not-found/not-found';

type AppProps = {
  offerCount: number;
}

function App({offerCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <MainScreen offerCount={offerCount} /> } />
        <Route path='/login' element={ <LoginScreen />} />
        <Route path='/offer/:id' element={ <RoomScreen /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
