import axios from 'axios';
import auth from '../urls/auth';
import {
  send1,
  send2,
  receive2,
  send3,
  receive3,
  send7,
  receive7,
} from '../type/auth';

const authApiController = {
  '1': (payload: send1) => {
    axios({
      url: auth['1'](),
      method: 'post',
      data: {
        phone: payload.phone,
      },
    })
      .then(res => console.log('성공', res))
      .catch(err => console.log('실패', err));
  },
  '2': async (payload: send2) => {
    return await axios({
      url: auth['2'](),
      method: 'post',
      data: {
        phone: payload.phone,
        code: payload.code,
        agreeFcmAd: payload.agreeFcmAd,
        fcmToken: payload.fcmToken,
        adid: payload.adid,
      },
    })
      .then(res => {
        const data: receive2 = res.data;
        return data;
      })
      .catch(err => {
        const data = err.response.status;
        return data;
      });
  },
  '3': async (payload: send3) => {
    console.log(payload);
    return await axios({
      url: auth['3'](),
      method: 'post',
      data: {
        phone: payload.phone,
        nickname: payload.nickname,
        image: payload.image,
        birthYear: payload.birthYear,
        interestList: payload.interestList,
        fcmToken: payload.fcmToken,
        regionCode: payload.regionCode,
        gender: payload.gender,
        agreeFcmAd: payload.agreeFcmAd,
        adid: payload.adid,
      },
    })
      .then(res => {
        const data: receive3 = res.data;
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  '7': async (payload: send7) => {
    return await axios({
      url: auth['7'](),
      method: 'get',
      params: {
        nickname: payload.nickname,
      },
    })
      .then(res => {
        const data: receive7 = res.data;
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  },
};

export default authApiController;
