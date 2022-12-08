import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { RoomProcess } from '../../types/state';

const initialState: RoomProcess = {
  currentCity: 'Paris',
  currentSortOption: 'Popular',
  activeRoomId: null,
};

export const roomProcess = createSlice({
  name: NameSpace.Room,
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
    setCurrentSortOption: (state, action: PayloadAction<string>) => {
      state.currentSortOption = action.payload;
    },
    setActiveRoomId: (state, action: PayloadAction<number | null>) => {
      state.activeRoomId = action.payload;
    },
  },
});

export const { setSelectedCity, setCurrentSortOption, setActiveRoomId } = roomProcess.actions;
