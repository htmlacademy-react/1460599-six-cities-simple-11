import { NameSpace } from '../../consts';
import { State } from '../../types/state';
import { Room } from '../../types/types';

export const getRooms = (state: State): Room[] => state[NameSpace.Data].rooms;
export const getCurrentRoom = (state: State) => state[NameSpace.Data].currentRoom;
export const getIsRoomsLoading = (state: State): boolean => state[NameSpace.Data].isRoomsLoading;
export const getIsRoomByIdLoading = (state: State): boolean => state[NameSpace.Data].isRoomByIdLoading;
export const getIsFormLoading = (state: State): boolean => state[NameSpace.Data].isFormLoading;
