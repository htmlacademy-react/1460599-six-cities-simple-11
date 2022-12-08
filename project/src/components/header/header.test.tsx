import Header from './header';
import { render, screen } from '@testing-library/react';
import { mocks } from '../../mocks/offer';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AuthorizationStatus, NameSpace } from '../../const';

const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth},
  [NameSpace.Data]: {
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
  [NameSpace.Room]: {
    currentCity: 'Paris',
    currentSortOption: 'Popular',
    activeRoomId: null,
  },
});

describe('Header component', () => {

  it('should render "Header" component', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByTestId('header-element')).toBeInTheDocument();
  });

});
