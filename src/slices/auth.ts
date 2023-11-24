import {createSlice} from '@reduxjs/toolkit';
import {act, create} from 'react-test-renderer';

type InitialState = {
  phone: string;
  nickname: string;
  birthYear: number;
  gender: number;
  profileImage: string;
  interest: string[];
  regionCode: string;
};

const initialState: InitialState = {
  phone: '',
  nickname: '',
  birthYear: 0,
  gender: 0,
  profileImage: '',
  interest: [],
  regionCode: '',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setPhone(state, action) {
      state.phone = action.payload.phone;
    },
    setNickname(state, action) {
      state.nickname = action.payload.nickname;
    },
    setBirthYear(state, action) {
      state.birthYear = action.payload.birthYear;
    },
    setGender(state, action) {
      state.gender = action.payload.gender;
    },
    setProfileImage(state, action) {
      state.profileImage = action.payload.profileImage;
    },
    setInterest(state, action) {
      state.interest = [...action.payload.interest];
    },
    setRegionCode(state, action) {
      state.regionCode = action.payload.regionCode
    }
  },
  extraReducers: builder => {},
});

export default authSlice;
