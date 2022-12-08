import { dataProcess } from './data-process';
import { fetchRooms, fetchRoomById, fetchNearbyInRoomById, fetchCommentsInRoomById, postCommentInRoomById } from '../api-actions';
import { mocks } from '../../mocks/offer';
import { comments } from '../../mocks/comments';
import { DataProcess } from '../../types/state';

const mockRooms = mocks;
const mockComments = comments;

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
};

describe('Reducer: dataProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(dataProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update ROOMS loading by start load rooms', () => {
    const state = initialState;
    expect(dataProcess.reducer(state, {type: fetchRooms.pending.type, payload: mockRooms}))
      .toEqual({
        rooms: [],
        currentRoom: {
          room: null,
          nearby: [],
          comments: [],
        },
        isRoomsLoading: true,
        isRoomByIdLoading: false,
        isFormLoading: false,
      });
  });

  it('should update ROOMS by load rooms and finish loading', () => {
    const state = initialState;
    expect(dataProcess.reducer(state, {type: fetchRooms.fulfilled.type, payload: mockRooms}))
      .toEqual({
        rooms: mockRooms,
        currentRoom: {
          room: null,
          nearby: [],
          comments: [],
        },
        isRoomsLoading: false,
        isRoomByIdLoading: false,
        isFormLoading: false,
      });
  });

  it('should not update ROOMS loading by load rooms', () => {
    const state = initialState;
    expect(dataProcess.reducer(state, {type: fetchRooms.rejected.type, payload: mockRooms}))
      .toEqual(initialState);
  });

  it('should update ROOM BY ID loading by start load room', () => {
    const state = initialState;
    expect(dataProcess.reducer(state, {type: fetchRoomById.pending.type, payload: mockRooms[0]}))
      .toEqual({
        rooms: [],
        currentRoom: {
          room: null,
          nearby: [],
          comments: [],
        },
        isRoomsLoading: false,
        isRoomByIdLoading: true,
        isFormLoading: false,
      });
  });

  it('should update ROOM BY ID by load room and finish loading', () => {
    const state = initialState;
    expect(dataProcess.reducer(state, {type: fetchRoomById.fulfilled.type, payload: mockRooms[0]}))
      .toEqual({
        rooms: [],
        currentRoom: {
          room: mockRooms[0],
          nearby: [],
          comments: [],
        },
        isRoomsLoading: false,
        isRoomByIdLoading: false,
        isFormLoading: false,
      });
  });

  it('should not update ROOM BY ID by rejected load room', () => {
    const state = initialState;
    expect(dataProcess.reducer(state, {type: fetchRoomById.rejected.type, payload: mockRooms[0]}))
      .toEqual(initialState);
  });

  it('should update NEARBY ROOM BY ID by load room and finish loading', () => {
    const state = initialState;
    expect(dataProcess.reducer(state, {type: fetchNearbyInRoomById.fulfilled.type, payload: [mockRooms[0], mockRooms[1], mockRooms[2]]}))
      .toEqual({
        rooms: [],
        currentRoom: {
          room: null,
          nearby: [mockRooms[0], mockRooms[1], mockRooms[2]],
          comments: [],
        },
        isRoomsLoading: false,
        isRoomByIdLoading: false,
        isFormLoading: false,
      });
  });

  it('should update COMMENTS ROOM BY ID by load room and finish loading', () => {
    const state = initialState;
    expect(dataProcess.reducer(state, {type: fetchCommentsInRoomById.fulfilled.type, payload: mockComments}))
      .toEqual({
        rooms: [],
        currentRoom: {
          room: null,
          nearby: [],
          comments: mockComments,
        },
        isRoomsLoading: false,
        isRoomByIdLoading: false,
        isFormLoading: false,
      });
  });

  it('post COMMENT IN ROOM BY ID by start post', () => {
    const state = initialState;
    expect(dataProcess.reducer(state, {type: postCommentInRoomById.pending.type, payload: null}))
      .toEqual({
        rooms: [],
        currentRoom: {
          room: null,
          nearby: [],
          comments: [],
        },
        isRoomsLoading: false,
        isRoomByIdLoading: false,
        isFormLoading: true,
      });
  });

  it('post COMMENT IN ROOM BY ID posted and load finished', () => {
    const state = initialState;
    expect(dataProcess.reducer(state, {type: postCommentInRoomById.fulfilled.type, payload: null}))
      .toEqual(initialState);
  });

  it('post COMMENT IN ROOM BY ID failed and load finished', () => {
    const state = initialState;
    expect(dataProcess.reducer(state, {type: postCommentInRoomById.rejected.type, payload: null}))
      .toEqual(initialState);
  });


});
