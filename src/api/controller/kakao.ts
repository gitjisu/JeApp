import axios from 'axios';
import kakao from '../urls/kakao';
import {
  send176,
  receive176,
} from '../type/kakao';
import EncryptedStorage from 'react-native-encrypted-storage/lib/typescript/EncryptedStorage';
import {getItem, setItem} from '../../store/localStorage';

const kakaoApiController = {
  '176': async (payload: send176) => {
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
        const data: receive176 = res.data;
        return data;
      })
      .catch(err => {
        console.log('176 실패', err);
      });
  },
};

export default kakaoApiController;
