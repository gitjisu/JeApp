import axios from 'axios';
import etc from '../urls/etc';
import {send123, receive123} from '../type/etc';

const etcApiController = {
  '123': async (payload: send123) => {
    return await axios({
      url: etc['123'](),
      method: 'post',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: payload,
    })
      .then(res => {
        const data: receive123 = res.data.urls[0];
        return data;
      })
      .catch(err => {
        console.error('api123error', err);
      });
  },
};

export default etcApiController;
