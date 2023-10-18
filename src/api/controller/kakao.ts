import axios from 'axios';
import kakao from '../urls/kakao';
import {KakaoAuthenticationSend, KakaoAuthenticationReceive} from '../type/kakao';
const api = {
  '176': async (payload: KakaoAuthenticationSend) => {
    const response = await axios({
      url: kakao['176'](),
      method: 'post',
      data: {
        kakaoAccessToken: payload.kakaoAccessToken,
        kakaoRefreshToken: payload.kakaoRefreshToken,
        adid: payload.adid,
      },
    })
      .then(res => {
        const data: KakaoAuthenticationReceive = res.data
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
};
