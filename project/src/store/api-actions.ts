import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute } from '../const';
import { Comment, Room } from '../types/types.js';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropUserEmail, saveUserEmail } from '../services/user-email';
import { CommentData, CommentDataWithId } from '../types/comment-data.js';

export const fetchRooms = createAsyncThunk<Room[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchRooms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Room[]>(APIRoute.Hotels);
    return data;
  },
);

export const fetchRoomById = createAsyncThunk<Room | null, number, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchRoomById',
  async (id, {extra: api}) => {
    const {data} = await api.get<Room | null>(`${APIRoute.Hotels}/${id}`);
    return data;
  },
);

export const fetchNearbyInRoomById = createAsyncThunk<Room[], number, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchRoomByIdNearbyAction',
  async (id, {extra: api}) => {
    const {data} = await api.get<Room[]>(`${APIRoute.Hotels}/${id}/nearby`);
    return data;
  },
);

export const fetchCommentsInRoomById = createAsyncThunk<Comment[], number, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchRoomByIdComments',
  async (id, {extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const postCommentInRoomById = createAsyncThunk<void, CommentDataWithId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postCommentByRoomId',
  async (data, {dispatch, extra: api}) => {
    await api.post<CommentData>(`${APIRoute.Comments}/${data.id}`, data.commentData);
    dispatch(fetchCommentsInRoomById(data.id));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    saveUserEmail(email);
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dropUserEmail();
  },
);
