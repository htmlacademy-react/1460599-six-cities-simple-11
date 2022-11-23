import { createReducer } from '@reduxjs/toolkit';
import { selectCity, setActiveRoomId, setCurrentSortOption, loadRooms, setIsRoomsLoaded, requireAuthorization, loadRoomById, setIsRoomLoaded, loadRoomByIdNearby, loadRoomByIdComments, setIsFormLoading } from './action';

import { AuthorizationStatus } from '../consts';
import { Room, Comment } from '../types/types';

type initialStateType = {
  authorizationStatus: AuthorizationStatus;
  isRoomsLoaded: boolean;
  isRoomLoaded: boolean;
  isFormLoading: boolean;
  currentCity: string;
  rooms: Room[];
  currentSortOption: string;
  activeRoomId: null | number;
  errorFromServer: string | null;
  currentRoom: {
    room: Room | null;
    nearby: Room[];
    comments: Comment[];
  };
}

const initialState: initialStateType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isRoomsLoaded: false,
  isRoomLoaded: false,
  isFormLoading: false,
  currentCity: 'Paris',
  rooms: [],
  currentSortOption: 'Popular',
  activeRoomId: null,
  errorFromServer: null,
  currentRoom: {
    room: null,
    nearby: [],
    comments: [],
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setCurrentSortOption, (state, action) => {
      state.currentSortOption = action.payload;
    })
    .addCase(setActiveRoomId, (state, action) => {
      state.activeRoomId = action.payload;
    })
    .addCase(loadRooms, (state, action) => {
      state.rooms = action.payload;
    })
    .addCase(setIsRoomsLoaded, (state, action) => {
      state.isRoomsLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setIsRoomLoaded, (state, action) => {
      state.isRoomLoaded = action.payload;
    })
    .addCase(loadRoomById, (state, action) => {
      state.currentRoom.room = action.payload;
    })
    .addCase(loadRoomByIdNearby, (state, action) => {
      state.currentRoom.nearby = action.payload;
    })
    .addCase(loadRoomByIdComments, (state, action) => {
      state.currentRoom.comments = action.payload;
    })
    .addCase(setIsFormLoading, (state, action) => {
      state.isFormLoading = action.payload;
    });
});

export {reducer};
