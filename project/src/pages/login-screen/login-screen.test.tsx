import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import LoginScreen from './login-screen';
import {AppRoute, AuthorizationStatus} from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
  DATA: {
    rooms: [],
    currentRoom: {
      room: null,
      nearby: [],
      comments: [],
    },
    isRoomsLoading: false,
    isRoomByIdLoading: false,
    isFormLoading: false,
    errorFromServer: null,
  },
  ROOM: {
    currentCity: 'Paris',
    currentSortOption: 'Popular',
    activeRoomId: null,
  },
});

describe('Component: LoginScreen', () => {
  beforeEach(() => {
    history.push(AppRoute.Login);
  });

  it('should render correctly', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Login} element={<LoginScreen />} />
          </Routes>
          {/* <Routes>
            <Route path={AppRoute.Root} element={<h1>Main screen</h1>} />
          </Routes> */}
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByText(/Sign in/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('email'), 'email@email.ru');
    await userEvent.type(screen.getByTestId('password'), 'password');

    expect(screen.getByDisplayValue('email@email.ru')).toBeInTheDocument();
    expect(screen.getByDisplayValue('password')).toBeInTheDocument();
  });

  // it('when user click "Replay Button" should redirect', async () => {
  //   render(
  //     <Provider store={store}>
  //       <HistoryRouter history={history}>
  //         <Routes>
  //           <Route
  //             path={AppRoute.Lose}
  //             element={<GameOverScreen />}
  //           />
  //           <Route
  //             path={AppRoute.Game}
  //             element={<h1>Mock Game Screen</h1>}
  //           />
  //         </Routes>
  //       </HistoryRouter>
  //     </Provider>,
  //   );

  //   await userEvent.click(screen.getByText(/Попробовать ещё раз/i));

  //   expect(screen.getByText(/Mock Game Screen/i)).toBeInTheDocument();
  // });
});
