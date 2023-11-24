import {combineReducers} from '@reduxjs/toolkit';
import userSlice from '../slices/user';
import uiSlice from '../slices/ui';
import authSlice from '../slices/auth';
const rootReducer = combineReducers({
  user: userSlice.reducer,
  ui: uiSlice.reducer,
  auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
