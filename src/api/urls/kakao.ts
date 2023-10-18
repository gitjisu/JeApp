const SERVER = 'https://oe-server-test.com';
const COMMON = '/v4';

const kakao = {
  '176': () => SERVER + COMMON + `/auth/kakao/authentication`,
};

export default kakao;
