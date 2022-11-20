import { createReducer } from '@reduxjs/toolkit';
import { selectCity, setActiveRoomId, setCurretSortOption, loadRooms, setErrorFromServer, setIsRoomsLoaded } from './action';
// import { mocks } from '../mocks/offer';
import { Room } from '../types/types';

type initialStateType = {
  currentCity: string;
  rooms: Room[];
  curretSortOption: string;
  activeRoomId: null | number;
  errorFromServer: string | null;
  isRoomsLoaded: boolean;
}

const initialState: initialStateType = {
  currentCity: 'Paris',
  rooms: [],
  curretSortOption: 'Popular',
  activeRoomId: null,
  errorFromServer: null,
  isRoomsLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setCurretSortOption, (state, action) => {
      state.curretSortOption = action.payload;
    })
    .addCase(setActiveRoomId, (state, action) => {
      state.activeRoomId = action.payload;
    })
    .addCase(loadRooms, (state, action) => {
      state.rooms = action.payload;
    })
    .addCase(setErrorFromServer, (state, action) => {
      state.errorFromServer = action.payload;
    })
    .addCase(setIsRoomsLoaded, (state, action) => {
      state.isRoomsLoaded = action.payload;
    });
});

export {reducer};
