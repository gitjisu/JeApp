import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isMainPage: false,
};

const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    setIsMainPage(state, action) {
      state.isMainPage = action.payload.isMainPage;
    },
  },
});

export default uiSlice;
