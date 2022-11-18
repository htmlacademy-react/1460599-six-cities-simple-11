import {createAction} from '@reduxjs/toolkit';
import { Room } from '../types/types';

export const selectCity = createAction('main/selectCity', (value: string) => ({
  payload: value
}));

export const setRooms = createAction('main/setRooms', (value: Room[]) => ({
  payload: value
}));

