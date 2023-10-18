import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Platform,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import {font} from '../../../styles/globalStyles';
import {login} from '@react-native-seoul/kakao-login';
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';

const VideoScreen = () => {
  const backgroundVideo = require('../../../assets/main.mp4');
  const [adid, setAdid] = useState<string | null>(null);
  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfo()
      .then((res: AdvertisingInfoResponse) => {
        console.log(res);
        !res.isAdTrackingLimited ? setAdid(res.id) : setAdid(null);
      })
      .catch(err => {
        setAdid(null);
      });
  }, []);
  const handleKakaoLogin = async (): Promise<void> => {
    try {
      const result = await login();
      const payload = {
        kakaoAccessToken: result.accessToken,
        kakaoRefreshToken: result.refreshToken,
        adid: adid,
      };
      console.log(payload);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOeLogin = () => {
    console.log('오이로그인을 처리하자');
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
