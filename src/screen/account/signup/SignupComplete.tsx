import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
//components
import BackButton from '../../../components/UI/BackButton';
import {AppNavigationType, AppRouteProp} from '../../../navigation/StackBase';
import {ios} from '../../../styles/iosTheme';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer';
import {font} from '../../../styles/globalStyles';

//storage
import {setItem} from '../../../store/localStorage';
import {useAppDispatch} from '../../../store';
import userSlice from '../../../slices/user';

type Props = {
  navigation: AppNavigationType;
  route: AppRouteProp.SignupComplete;
};

const SignupComplete = ({navigation, route}: Props) => {
  const params = route.params;
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    setItem('refreshToken', params.response?.refreshToken);
    dispatch(
      userSlice.actions.setAccessToken({
        accessToken: params.response?.accessToken,
      }),
    );
    dispatch(
      userSlice.actions.setUser({
        user: params.response?.user,
      }),
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            width: '100%',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: -64,
          }}>
          <Text
            style={{
              fontFamily: font.preReg,
              fontSize: 20,
              lineHeight: 25,
              textAlign: 'center',
              marginBottom: 20,
            }}>
            회원이 되신걸 축하해요!{'\n'}즐거운 취미모임을 응원할게요!
          </Text>
          {params.response?.user.img ? (
            <Image
              source={{uri: params.response?.user.img}}
              style={{width: 128, height: 128, borderRadius: 100}}
            />
          ) : (
            <View
              style={{
                width: 128,
                height: 128,
                borderRadius: 100,
                backgroundColor: '#d9d9d9',
              }}></View>
          )}
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}></View>
      <Pressable
        onPress={handleLogin}
        style={{
          height: Platform.OS === 'ios' ? 48 + ios.BOTTOM_INDICATOR_HEIGHT : 48,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'center',
          backgroundColor: '#25a765',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: font.preReg,
            color: '#ffffff',
            fontSize: 14,
            lineHeight: 16.71,
            paddingBottom:
              Platform.OS === 'ios' ? ios.BOTTOM_INDICATOR_HEIGHT : undefined,
          }}>
          다음
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SignupComplete;
