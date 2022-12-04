import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../consts';

export const redirectToRoute = createAction('main/redirectToRoute', (value: AppRoute) => ({
  payload: value
}));
