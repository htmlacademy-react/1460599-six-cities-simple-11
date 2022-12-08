import {render, screen} from '@testing-library/react';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import MainScreen from './main-screen';
import {AppRoute, AuthorizationStatus} from '../../const';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

describe('Component: MainScreen', () => {
  beforeEach(() => {
    history.push(AppRoute.Root);
  });

  it('should render correctly', () => {
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

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Root} element={<MainScreen />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(/Places/i)).toBeInTheDocument();
  });

  it('should redirect to Login screen when click "sign in"', async () => {
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

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Root} element={<MainScreen />} />
            <Route path={AppRoute.Login} element={<h1>Login screen</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByText(/Sign in/i));

    expect(screen.getByText(/Login screen/i)).toBeInTheDocument();

  });

});
