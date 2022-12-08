import {render, screen} from '@testing-library/react';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import NotFoundScreen from './not-found-screen';
import {AppRoute, AuthorizationStatus} from '../../const';
import userEvent from '@testing-library/user-event';

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

describe('Component: MainScreen', () => {
  beforeEach(() => {
    history.push('/not-existance-rout');
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={'*'} element={<NotFoundScreen />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/PAGE NOT FOUND :\|/i)).toBeInTheDocument();
    expect(screen.getByText(/на главную!/i)).toBeInTheDocument();
  });

  it('should go to MainScreen after button "на главную!" click', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={'*'} element={<NotFoundScreen />} />
          </Routes>
          <Routes>
            <Route path={AppRoute.Root} element={<h1>Main screen</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByText(/на главную!/i));

    expect(screen.getByText(/Main screen/i)).toBeInTheDocument();
  });

});
