import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { dataProcess } from './data-process/data-process';
import { roomProcess} from './room-process/room-process';
import { userProcess} from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.Room]: roomProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
