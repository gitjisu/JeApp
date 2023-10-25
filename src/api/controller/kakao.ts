import axios from 'axios';
import kakao from '../urls/kakao';
import {
  KakaoAuthenticationSend,
  KakaoAuthenticationReceive,
} from '../type/kakao';
import EncryptedStorage from 'react-native-encrypted-storage/lib/typescript/EncryptedStorage';
import {getItem, setItem} from '../../store/localStorage';

const api = {
  '176': async (payload: KakaoAuthenticationSend) => {
    return await axios({
      url: kakao['176'](),
      method: 'post',
      data: {
        kakaoAccessToken: payload.kakaoAccessToken,
        kakaoRefreshToken: payload.kakaoRefreshToken,
        adid: payload.adid,
      },
    })
      .then(async res => {
        const data: KakaoAuthenticationReceive = res.data;
        return data;
      })
      .catch(err => {
        console.log('176 실패', err);
      });
  },
};

export default api;
