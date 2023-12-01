import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {receive3} from '../api/type/auth';
export type RootStackParamList = {
  VideoScreen: undefined;
  Home: undefined;
  My: undefined;
  Agreement: undefined;
  AuthenticationPhoneNumber: undefined;
  VerificationCode: undefined;
  Test: undefined;
  Nickname: undefined;
  BirthYear: undefined;
  Gender: undefined;
  ProfileImage: undefined;
  Interest: undefined;
  Region: undefined;
  SignupComplete: {
    response: receive3;
  };
  KakaoInterest: undefined;
  KakaoNickname: undefined;
  KakaoRegion: undefined;
  Ban: {
    id: number;
  };
};

export namespace AppRouteProp {
  export type SignupComplete = RouteProp<RootStackParamList, 'SignupComplete'>;
  export type Ban = RouteProp<RootStackParamList, 'Ban'>;
}

export type AppNavigationType = NativeStackNavigationProp<RootStackParamList>;
