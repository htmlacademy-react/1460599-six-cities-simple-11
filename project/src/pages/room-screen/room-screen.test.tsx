import {render, screen} from '@testing-library/react';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import RoomScreen from './room-screen';
import { mocks } from '../../mocks/offer';
import { comments } from '../../mocks/comments';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth},
  [NameSpace.Data]: {
    rooms: mocks,
    currentRoom: {
      room: mocks[0],
      nearby: mocks,
      comments: comments,
    },
    isRoomsLoading: false,
    isRoomByIdLoading: false,
    isFormLoading: false,
    errorFromServer: null,
  },
  [NameSpace.Room]: {
    currentCity: 'Paris',
    currentSortOption: 'Popular',
    activeRoomId: null,
  },
});

describe('Component: RoomScreen', () => {
  beforeEach(() => {
    history.push(`${AppRoute.Room}/1`);
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={`${AppRoute.Room}/:id`} element={<RoomScreen />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Personal room offer/i)).toBeInTheDocument();
  });

});
