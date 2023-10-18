import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'usersResucer',
  initialState,
  // mutation
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: builder => {},
});

export default userSlice;
