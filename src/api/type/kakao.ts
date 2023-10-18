export interface KakaoAuthenticationSend {
  kakaoAccessToken: string;
  kakaoRefreshToken: string;
  adid: string;
}

export interface KakaoAuthenticationReceive {
  state: 'newUser' | 'existingUser' | 'withdrawUser'
  newUser?: {
    tempToken: string,
    phone: string,
    nickname: string,
    image: string,
    birthYear: number,
    gender: 1 | 2,
    agreeFcmAd: boolean
  },
  existingUser?: {
    accessToken: string,
    refreshToken: string,
    user: {
      id: number,
      phone: string,
      nickname: string,
      image: string,
      birthYear: number,
      interestList: string[],
      regionCode: string,
      agreeFcm: boolean,
      agreeFcmAd: boolean,
      agreeFcmChat: boolean,
      agreeFcmMy: boolean,
      oeList: Object[],
      ban: boolean,
      gender: number
    }
  }
}

// body: {
//   state: ‘newUser’ | ‘existingUser’, ‘withdrawUser’
//   newUser?: {
//     tempToken: string,
//     phone: string(11),
//     nickname: string,
//     image: string,
//     birthYear: number,
//     gender: 1 | 2,
//     agreeFcmAd: boolean
//   },
//   existingUser?: {
//     accessToken: string,
//     refreshToken: string,
//     user: {
//       id: number,
//       phone: string(11),
//       nickname: string,
//       image: string,
//       birthYear: number,
//       interestList: string[],
//       regionCode: string(4),
//       agreeFcm: boolean,
//       agreeFcmAd: boolean,
//       agreeFcmChat: boolean,
//       agreeFcmMy: boolean,
//       oeList: Object[],
//       ban: boolean,
//       gender: number
//     }
//   }
// }