import MainScreen from '../../pages/main-screen';

type AppProps = {
  offerCount: number;
}

function App({offerCount}: AppProps): JSX.Element {
  return <MainScreen offerCount={offerCount} />;
}

export default App;
