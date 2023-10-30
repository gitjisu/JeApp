import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  VideoScreen: undefined;
  Home: undefined;
};

export namespace AppRouteProp {
  export type Home = RouteProp<RootStackParamList, 'Home'>;
}

export type AppNavigationType = NativeStackNavigationProp<RootStackParamList>;
