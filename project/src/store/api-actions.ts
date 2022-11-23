import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { loadRoomById, loadRoomByIdComments, loadRoomByIdNearby, loadRooms, redirectToRoute, requireAuthorization, setIsFormLoading, setIsRoomLoaded, setIsRoomsLoaded } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../consts';
import { Comment, Room } from '../types/types.js';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropUserEmail, saveUserEmail } from '../services/user-email';
import { CommentData, CommentDataWithId } from '../types/comment-data.js';

export const fetchRoomsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchRooms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Room[]>(APIRoute.Hotels);
    dispatch(loadRooms(data));
    dispatch(setIsRoomsLoaded(true));
  },
);

export const fetchRoomByIdAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchRoomById',
  async (id, {dispatch, extra: api}) => {
    try {
      dispatch(setIsRoomLoaded(false));
      const {data} = await api.get<Room | null>(`${APIRoute.Hotels}/${id}`);
      dispatch(loadRoomById(data));
      dispatch(setIsRoomLoaded(true));
    } catch {
      dispatch(setIsRoomLoaded(true));
    }
  },
);

export const fetchRoomByIdNearbyAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchRoomByIdNearbyAction',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Room[]>(`${APIRoute.Hotels}/${id}/nearby`);
    dispatch(loadRoomByIdNearby(data));
  },
);

export const fetchRoomByIdComments = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchRoomByIdComments',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    dispatch(loadRoomByIdComments(data));
  },
);

export const postCommentByRoomId = createAsyncThunk<void, CommentDataWithId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postCommentByRoomId',
  async (data, {dispatch, extra: api}) => {
    try {
      dispatch(setIsFormLoading(true));
      await api.post<CommentData>(`${APIRoute.Comments}/${data.id}`, data.commentData);
      dispatch(fetchRoomByIdComments(data.id));
      dispatch(setIsFormLoading(false));
    } catch {
      dispatch(setIsFormLoading(false));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
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
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dropUserEmail();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute(AppRoute.Login));
  },
);
