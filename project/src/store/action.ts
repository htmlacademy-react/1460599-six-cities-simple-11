import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

export const redirectToRoute = createAction('main/redirectToRoute', (value: AppRoute) => ({
  payload: value
}));
