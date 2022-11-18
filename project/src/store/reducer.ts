import { createReducer } from '@reduxjs/toolkit';
import { selectCity, setActiveRoomId, setCurretSortOption, setRooms } from './action';
import { mocks } from '../mocks/offer';
import { Room } from '../types/types';

type initialStateType = {
  currentCity: string;
  rooms: Room[];
  curretSortOption: string;
  activeRoomId: null | number;
}

const initialState: initialStateType = {
  currentCity: 'Paris',
  rooms: mocks,
  curretSortOption: 'Popular',
  activeRoomId: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setRooms, (state, action) => {
      state.rooms = action.payload;
    })
    .addCase(setCurretSortOption, (state, action) => {
      state.curretSortOption = action.payload;
    })
    .addCase(setActiveRoomId, (state, action) => {
      state.activeRoomId = action.payload;
    });
});

export {reducer};
