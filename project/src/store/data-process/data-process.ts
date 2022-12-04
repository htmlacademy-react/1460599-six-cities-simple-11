import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { DataProcess } from '../../types/state';
import { fetchRooms, fetchRoomById, fetchCommentsInRoomById, fetchNearbyInRoomById, postCommentInRoomById } from '../api-actions';

const initialState: DataProcess = {
  rooms: [],
  currentRoom: {
    room: null,
    nearby: [],
    comments: [],
  },
  isRoomsLoading: false,
  isRoomByIdLoading: false,
  isFormLoading: false,
  errorFromServer: null,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.isRoomsLoading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.isRoomsLoading = false;
      })
      .addCase(fetchRooms.rejected, (state) => {
        state.isRoomsLoading = false;
      })
      .addCase(fetchRoomById.pending, (state) => {
        state.isRoomByIdLoading = true;
      })
      .addCase(fetchRoomById.fulfilled, (state, action) => {
        state.currentRoom.room = action.payload;
        state.isRoomByIdLoading = false;
      })
      .addCase(fetchRoomById.rejected, (state) => {
        state.isRoomByIdLoading = false;
      })
      .addCase(fetchNearbyInRoomById.fulfilled, (state, action) => {
        state.currentRoom.nearby = action.payload;
      })
      .addCase(fetchCommentsInRoomById.fulfilled, (state, action) => {
        state.currentRoom.comments = action.payload;
      })
      .addCase(postCommentInRoomById.pending, (state) => {
        state.isFormLoading = true;
      })
      .addCase(postCommentInRoomById.fulfilled, (state) => {
        state.isFormLoading = false;
      })
      .addCase(postCommentInRoomById.rejected, (state,) => {
        state.isFormLoading = false;
      });
  }
});
