import { createAction } from '@reduxjs/toolkit';
import { Room } from '../types/types';

export const selectCity = createAction('main/selectCity', (value: string) => ({
  payload: value
}));

export const setRooms = createAction('main/setRooms', (value: Room[]) => ({
  payload: value
}));

export const setCurretSortOption = createAction('main/setCurretSortOption', (value: string) => ({
  payload: value
}));

export const setActiveRoomId = createAction('places-list/setActiveRoomId', (value: number | null) => ({
  payload: value
}));

