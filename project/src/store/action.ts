import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../consts';
import { Comment, Room } from '../types/types';

export const selectCity = createAction('main/selectCity', (value: string) => ({
  payload: value
}));

export const setCurrentSortOption = createAction('main/setCurretSortOption', (value: string) => ({
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

export const setIsRoomsLoaded = createAction('main/setIsRoomsLoaded', (value: boolean) => ({
  payload: value
}));

export const redirectToRoute = createAction('main/redirectToRoute', (value: AppRoute) => ({
  payload: value
}));

export const loadRoomById = createAction('room/loadRoomById', (value: Room | null) => ({
  payload: value
}));

export const setIsRoomLoaded = createAction('main/setIsRoomLoaded', (value: boolean) => ({
  payload: value
}));

export const loadRoomByIdNearby = createAction('main/loadRoomByIdNearby', (value: Room[]) => ({
  payload: value
}));

export const loadRoomByIdComments = createAction('main/loadRoomByIdComments', (value: Comment[]) => ({
  payload: value
}));

export const setIsFormLoading = createAction('room/setIsFormLoading', (value: boolean) => ({
  payload: value
}));
