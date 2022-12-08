import PlaceCard from './place-card';
import { render, screen } from '@testing-library/react';
import { mocks } from '../../mocks/offer';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
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

describe('Place Card component:', () => {

  it('should render "PlaceCard" component', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard room={mocks[0]} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('place-card-element')).toBeInTheDocument();
  });

});
