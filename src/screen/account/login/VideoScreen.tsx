import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Platform,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
//style
import {font} from '../../../styles/globalStyles';
//third party
import Video from 'react-native-video';
import {login} from '@react-native-seoul/kakao-login';
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';
//api
import kakaoApiController from '../../../api/controller/kakao';
//localstorage
import {setItem} from '../../../store/localStorage';
//store
import {useAppDispatch} from '../../../store';
import userSlice from '../../../slices/user';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import {AppNavigationType, AppRouteProp} from '../../../navigation/StackBase';
import authSlice from '../../../slices/auth';
type Props = {
  navigation: AppNavigationType;
};
const VideoScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const backgroundVideo = require('../../../assets/main.mp4');
  const adid = useRef('');

  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfo()
      .then((res: AdvertisingInfoResponse) => {
        !res.isAdTrackingLimited
          ? (adid.current = res.id as string)
          : (adid.current = '');
      })
      .catch(err => {
        adid.current = '';
      });
  }, []);
  const handleKakaoLogin = async (): Promise<void> => {
    try {
      const kakao = await login();
      const payload = {
        kakaoAccessToken: kakao.accessToken,
        kakaoRefreshToken: kakao.refreshToken,
        adid: adid.current,
      };
      const user = await kakaoApiController['176'](payload);
      if (user) {
        if (user.state === 'existingUser') {
          if (user.existingUser?.user.ban) {
            navigation.navigate('Ban', {id: user.existingUser.user.id});
          } else {
            setItem('refreshToken', user.existingUser?.refreshToken);
            dispatch(
              userSlice.actions.setAccessToken({
                accessToken: user.existingUser?.accessToken,
              }),
            );
            dispatch(
              userSlice.actions.setUser({
                user: user.existingUser?.user,
              }),
            );
          }
        } else if (user.state === 'newUser') {
          if (user.newUser?.nickname) {
            dispatch(authSlice.actions.setPhone({phone: user.newUser?.phone}));
            dispatch(
              authSlice.actions.setNickname({nickname: user.newUser?.nickname}),
            );
            dispatch(
              authSlice.actions.setBirthYear({
                birthYear: user.newUser?.birthYear,
              }),
            );
            dispatch(
              authSlice.actions.setGender({gender: user.newUser?.gender}),
            );
            if (user.newUser?.image) {
              dispatch(
                authSlice.actions.setProfileImage({
                  profileImage: user.newUser?.image,
                }),
              );
            }
            navigation.navigate('KakaoInterest');
          } else {
            dispatch(authSlice.actions.setPhone({phone: user.newUser?.phone}));
            dispatch(
              authSlice.actions.setBirthYear({
                birthYear: user.newUser?.birthYear,
              }),
            );
            dispatch(
              authSlice.actions.setGender({gender: user.newUser?.gender}),
            );
            if (user.newUser?.image) {
              dispatch(
                authSlice.actions.setProfileImage({
                  profileImage: user.newUser?.image,
                }),
              );
            }
            navigation.navigate('KakaoNickname');
          }
        } else if (user.state === 'withdrawUser') {
          Alert.alert('가입불가', '1주일 이내 탈퇴 유저라능', [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOeLogin = () => {
    navigation.navigate('AuthenticationPhoneNumber');
  };
  return (
    <View style={{flex: 1}}>
      <Video
        style={{flex: 1}}
        source={backgroundVideo}
        resizeMode="cover"
        repeat
        paused={false}
        muted={true}
        playInBackground={true}
      />
      <View style={styles.videoScreen}></View>
      <View style={styles.contents}>
        <View style={styles.textWrapper}>
          <Text style={styles.hpText1}>오이</Text>
          <Text style={styles.hpText2}>취미 생활을 꽃 피우다</Text>
        </View>
        <View>
          <Pressable style={styles.btnKakao} onPress={handleKakaoLogin}>
            <Image
              source={require('../../../assets/ic_kakao.png')}
              style={styles.icKakao}></Image>
            <Text style={styles.btnKakaoText}>카카오로 5초안에 로그인</Text>
          </Pressable>
          <Pressable style={styles.btnOe} onPress={handleOeLogin}>
            <Text style={styles.btnOeText}>휴대폰 번호로 로그인</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  videoScreen: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#222',
    opacity: 0.5,
  },
  contents: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 42,
    paddingBottom: 42,
    justifyContent: 'flex-end',
  },
  textWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 32,
  },
  hpText1: {
    fontSize: 44,
    color: 'white',
    fontFamily: font.cafeBold,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },
  hpText2: {
    fontSize: 24,
    color: 'white',
    fontFamily: font.preReg,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },
  btnKakao: {
    height: 56,
    backgroundColor: '#f7e01b',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnOe: {
    height: 56,
    backgroundColor: '#25a765',
    marginTop: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnKakaoText: {
    color: '#3e1918',
    fontSize: 16,
    fontFamily: font.preReg,
  },
  btnOeText: {
    color: 'white',
    fontSize: 16,
    fontFamily: font.preReg,
  },
  icKakao: {
    width: 16,
    resizeMode: 'contain',
    marginRight: 5,
  },
});

export default VideoScreen;
