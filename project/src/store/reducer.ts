import { createReducer } from '@reduxjs/toolkit';
import { selectCity, setRooms } from './action';
import { mocks } from '../mocks/offer';

const initialState = {
  currentCity: 'Paris',
  rooms: mocks,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setRooms, (state, action) => {
      state.rooms = action.payload;
    });
});

export {reducer};
