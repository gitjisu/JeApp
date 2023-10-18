import {combineReducers} from '@reduxjs/toolkit';
import userSlice from '../slices/user';
import uiSlice from '../slices/ui';
const rootReducer = combineReducers({
  user: userSlice.reducer,
  ui: uiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
