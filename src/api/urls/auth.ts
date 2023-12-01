const SERVER = 'https://oe-server-test.com/api/app';
const COMMON = '/v4';

const auth = {
  '1': () => SERVER + COMMON + `/auth/request-phone-auth`,
  '2': () => SERVER + COMMON + `/auth/verify-phone-auth`,
  '3': () => SERVER + COMMON + `/auth/account`,
  '7': () => SERVER + COMMON + `/auth/nickname-existence`,
  '8': () => SERVER + COMMON + `/auth/withdraw-existence`,
  '155': (id: number) => SERVER + COMMON + `/user/${id}/ban-info`,
};

export default auth;
