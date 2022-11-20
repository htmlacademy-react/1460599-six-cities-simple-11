import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../consts';
import { Room } from '../types/types';

export const selectCity = createAction('main/selectCity', (value: string) => ({
  payload: value
}));

export const setCurretSortOption = createAction('main/setCurretSortOption', (value: string) => ({
  payload: value
}));

export const setActiveRoomId = createAction('places-list/setActiveRoomId', (value: number | null) => ({
  payload: value
}));

export const loadRooms = createAction('data/loadRooms', (value: Room[]) => ({
  payload: value
}));


export const requireAuthorization = createAction('user/requireAuthorization', (value: AuthorizationStatus) => ({
  payload: value
}));

export const setErrorFromServer = createAction('main/setErrorFromServer', (value: string | null) => ({
  payload: value
}));

export const setIsRoomsLoaded = createAction('main/setIsRoomsLoaded', (value: boolean) => ({
  payload: value
}));
