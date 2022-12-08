import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { checkAuthAction, fetchCommentsInRoomById, fetchNearbyInRoomById, fetchRoomById, fetchRooms, loginAction, logoutAction } from './api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './action';
import { mocks } from '../mocks/offer';
import { comments } from '../mocks/comments';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(2);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-simple-token', 'secret');
    expect(Storage.prototype.setItem).toBeCalledWith('user-email-value', 'test@test.ru');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      redirectToRoute.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(2);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-simple-token');
    expect(Storage.prototype.removeItem).toBeCalledWith('user-email-value');
  });

  it('should dispatch Load_Rooms when GET /hotels', async () => {
    mockAPI
      .onGet(APIRoute.Hotels)
      .reply(200, mocks);

    const store = mockStore();

    await store.dispatch(fetchRooms());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchRooms.pending.type,
      fetchRooms.fulfilled.type
    ]);
  });

  it('should dispatch Load_Rooms when GET /hotels/id', async () => {
    const id = 1;

    mockAPI
      .onGet(`${APIRoute.Hotels}/${id}`)
      .reply(200, mocks[0]);

    const store = mockStore();

    await store.dispatch(fetchRoomById(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchRoomById.pending.type,
      fetchRoomById.fulfilled.type
    ]);
  });

  it('should dispatch Load_Rooms when GET /hotels/id/nearby', async () => {
    const id = 1;

    mockAPI
      .onGet(`${APIRoute.Hotels}/${id}/nearby`)
      .reply(200, mocks);

    const store = mockStore();

    await store.dispatch(fetchNearbyInRoomById(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearbyInRoomById.pending.type,
      fetchNearbyInRoomById.fulfilled.type
    ]);
  });

  it('should dispatch Load_Rooms when GET /hotels/id/comments', async () => {
    const id = 1;

    mockAPI
      .onGet(`${APIRoute.Comments}/${id}`)
      .reply(200, comments);

    const store = mockStore();

    await store.dispatch(fetchCommentsInRoomById(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCommentsInRoomById.pending.type,
      fetchCommentsInRoomById.fulfilled.type
    ]);
  });

});
