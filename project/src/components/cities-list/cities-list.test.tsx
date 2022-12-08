import CitiesList from './cities-list';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import { mocks } from '../../mocks/offer';
import { AuthorizationStatus, Cities } from '../../const';
import { createMemoryHistory } from 'history';

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


describe('Cities List component', () => {

  it('should render "CitiesList" component', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CitiesList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(Cities.Amsterdam)).toBeInTheDocument();
    expect(screen.getByText(Cities.Brussels)).toBeInTheDocument();
    expect(screen.getByText(Cities.Cologne)).toBeInTheDocument();
    expect(screen.getByText(Cities.Dusseldorf)).toBeInTheDocument();
    expect(screen.getByText(Cities.Hamburg)).toBeInTheDocument();
    expect(screen.getByText(Cities.Paris)).toBeInTheDocument();
  });

});
