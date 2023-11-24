import {createSlice} from '@reduxjs/toolkit';

type User = {
  id: number;
  phone: string;
  img: string;
  birthYear: number;
  interestList: string[];
  regionCode: string;
  agreeFcm: boolean;
  agreeFcmAd: boolean;
  agreeFcmChat: boolean;
  agreeFcmMy: boolean;
  oeList: Object[];
  nickname: string;
  ban: boolean;
};

type InitialState = {
  accessToken: string;
  user: null | User;
};

const initialState: InitialState = {
  accessToken: '',
  user: null,
};

const userSlice = createSlice({
  name: 'usersResucer',
  initialState,
  // mutation
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: builder => {},
});

export default userSlice;
