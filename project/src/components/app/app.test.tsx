import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AuthorizationStatus, AppRoute } from '../../const';
import App from './app';
import { mocks } from '../../mocks/offer';

const mockStore = configureMockStore();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {
    rooms: mocks,
    currentRoom: {
      room: mocks[0],
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

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(/Places/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getAllByText(/Sign in/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "RoomScreen" when user navigate to "/offer/:id"', () => {
    history.push(`${AppRoute.Room}/1`);

    render(fakeApp);

    expect(screen.getByText(/Personal room offer/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/PAGE NOT FOUND :\|/i)).toBeInTheDocument();
    expect(screen.getByText(/на главную!/i)).toBeInTheDocument();
  });
});
