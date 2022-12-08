import { store } from '../store/index';
import { AuthorizationStatus } from '../const';
import { Room, Comment } from './types';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type DataProcess = {
  rooms: Room[];
  currentRoom: {
    room: Room | null;
    nearby: Room[];
    comments: Comment[];
  };
  isRoomsLoading: boolean;
  isRoomByIdLoading: boolean;
  isFormLoading: boolean;
};

export type RoomProcess = {
  currentCity: string;
  currentSortOption: string;
  activeRoomId: null | number;
};

