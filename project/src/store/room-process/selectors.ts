import { NameSpace } from '../../consts';
import { State } from '../../types/state';

export const getCurrentCity = (state: State): string => state[NameSpace.Room].currentCity;
export const getCurrentSortOption = (state: State): string => state[NameSpace.Room].currentSortOption;
export const getActiveRoomId = (state: State): number | null => state[NameSpace.Room].activeRoomId;
