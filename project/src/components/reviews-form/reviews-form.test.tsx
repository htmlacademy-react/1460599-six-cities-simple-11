import ReviewsForm from './reviews-form';
import { render, screen } from '@testing-library/react';
import { mocks } from '../../mocks/offer';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

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

describe('Reviews Form component', () => {

  it('should render "ReviewsForm" component', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsForm id={1} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('reviews-form-element')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('textarea-element'), 'abcdf');

    expect(screen.getByDisplayValue(/abcdf/i)).toBeInTheDocument();
  });

});
