import { AnyAction } from 'redux';
import { redirect } from './redirect';
import { redirectToRoute } from '../action';
import { State } from '../../types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { AppRoute } from '../../const';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) { this.location.pathname = path; },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should redirect to NotFoundScreen', () => {
    store.dispatch(redirectToRoute(AppRoute.Root));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Root);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Root)
    ]);
  });

  it('should not to be redirect /login because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Login});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Login);
  });
});
