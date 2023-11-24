import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

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
  SignupComplete: undefined;
};

export namespace AppRouteProp {
  export type Home = RouteProp<RootStackParamList, 'Home'>;
}

export type AppNavigationType = NativeStackNavigationProp<RootStackParamList>;
