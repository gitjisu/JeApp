export type send1 = {
  phone: string;
};

export type send2 = {
  phone: string;
  code: string;
  agreeFcmAd: boolean;
  fcmToken: string;
  adid: string;
};

export type receive2 = null | {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    phone: string;
    nickname: string;
    image: string;
    birthYear: number;
    interestList: string[];
    regionCode: string;
    agreeFcm: boolean;
    agreeFcmAd: boolean;
    agreeFcmChat: boolean;
    agreeFcmMy: boolean;
    oeList: Object[];
    ban: boolean;
    gender: number;
  };
};

export type send7 = {
  nickname: string;
};

export type receive7 = {
  existence: boolean;
};

export type send3 = {
  phone: string;
  nickname: string;
  image: string;
  birthYear: number;
  interestList: string[];
  fcmToken: string;
  regionCode: string;
  gender: number;
  agreeFcmAd: boolean;
  adid: string;
};

export type receive3 = null | {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    phone: string;
    nickname: string;
    image: string;
    birthYear: number;
    interestList: string[];
    regionCode: string;
    agreeFcm: boolean;
    agreeFcmAd: boolean;
    agreeFcmChat: boolean;
    agreeFcmMy: boolean;
    oeList: Object[];
    ban: boolean;
    gender: number;
  };
};
