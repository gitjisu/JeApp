import {
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  Platform,
  Animated,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

//component
import BackButton from '../../../components/UI/BackButton';
import {AppNavigationType} from '../../../navigation/StackBase';
import {ios} from '../../../styles/iosTheme';
import {font} from '../../../styles/globalStyles';

//api
import authApiController from '../../../api/controller/auth';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer';

//localstorage
import {setItem} from '../../../store/localStorage';
import {useAppDispatch} from '../../../store';
import userSlice from '../../../slices/user';

type Props = {
  navigation: AppNavigationType;
};

const VerificationCode = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const phone = useSelector((state: RootState) => state.auth.phone);
  const [number, setNumber] = useState<string>('');
  const [isNextPossible, setIsNextPossible] = useState('#BEEBD4');
  const [isRequestFail, setIsRequestFail] = useState(false);
  const [isRequestExpired, setIsRequestExpired] = useState(false);
  const handleInputChange = (text: string) => {
    const isValidSixDigitNumber = /^\d{6}$/.test(text);
    const numericInput = text.replace(/[^0-9]/g, '');
    setNumber(numericInput);
    if (isValidSixDigitNumber) {
      setIsNextPossible('#25A765');
    }
  };
  const [minutes, setMinutes] = useState<number>(5);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(timer); // 타이머 정지
        // 여기에서 원하는 동작을 수행하세요 (예: 다음 페이지로 이동)
        setIsRequestExpired(true);
      } else {
        if (seconds === 0) {
          setMinutes(prevMinutes => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
      }
    }, 1000);

    // 컴포넌트가 언마운트되면 타이머 정지
    return () => clearInterval(timer);
  }, [minutes, seconds]);

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
    seconds,
  ).padStart(2, '0')}`;

  const [shakeAnimation] = useState(new Animated.Value(0));
  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleNextPage = async () => {
    const payload = {
      phone: phone,
      code: number,
      agreeFcmAd: true,
      fcmToken: '',
      adid: '',
    };
    const user = await authApiController[2](payload);

    // 로그인 정상작동
    if (user.user) {
      if (user.user.ban) {
        console.log('차단페이지 ㄱㄱ');
      } else {
        setItem('refreshToken', user.refreshToken);
        dispatch(
          userSlice.actions.setAccessToken({accessToken: user.accessToken}),
        );
        dispatch(
          userSlice.actions.setUser({
            user: user.user,
          }),
        );
      }
      // 인증번호 불일치
    } else if (user === 401) {
      setIsRequestFail(true);
      setIsNextPossible('#BEEBD4');
      startShakeAnimation(); // 화면 흔들림 애니메이션 시작
    } else {
      // 회원가입
      navigation.navigate('Nickname');
    }
  };
  const handleReVerificationCode = () => {
    setMinutes(5);
    setSeconds(0);
    setIsRequestExpired(false);
    setIsRequestFail(false);
    setIsRequestExpired(false);
    setNumber('');
    setIsNextPossible('#BEEBD4');
    const payload = {
      phone: phone,
    };
    authApiController['1'](payload);
  };
  return (
    <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{backgroundColor: '#ffffff', flex: 1}}>
        {/* 뒤로가기버튼 */}
        <BackButton navigation={navigation} />

        <Animated.View
          style={[
            {marginTop: 35, paddingHorizontal: 32},
            {transform: [{translateX: shakeAnimation}]},
          ]}>
          <Text
            style={{
              fontSize: 20,
              lineHeight: 30,
              fontFamily: font.preReg,
              color: '#000000',
            }}>
            문자를 보냈어요{'\n'}
            인증번호를 입력해주세요
          </Text>
        </Animated.View>

        {/* 인증번호 입력 필드 */}
        <Pressable style={{paddingHorizontal: 32, paddingVertical: 16}}>
          <TextInput
            keyboardType="numeric"
            maxLength={6}
            value={number}
            onChangeText={handleInputChange}
            style={{
              height: 48,
              borderColor: '#F2F2F2',
              backgroundColor: '#F2F2F2',
              borderWidth: 1,
              paddingLeft: 16,
            }}
          />
          <Text
            style={{
              position: 'absolute',
              right: 48,
              height: '100%',
              marginTop: 16,
              textAlign: 'center',
              textAlignVertical: 'center',
              lineHeight: 48, // 높이와 동일하게 설정
            }}>
            {formattedTime}
          </Text>
        </Pressable>
        <View style={{paddingHorizontal: 32}}>
          {isRequestFail && !isRequestExpired && (
            <Text style={{fontFamily: font.preReg, color: '#DC0000'}}>
              인증번호가 틀렸어요 {'\n'}핸드폰 번호 또는 인증번호를 확인해주세요
            </Text>
          )}
          {isRequestExpired && (
            <Text style={{fontFamily: font.preReg, color: '#DC0000'}}>
              인증시간이 만료되었어요
            </Text>
          )}
        </View>
        <Pressable style={{paddingHorizontal: 32}}>
          <Text
            onPress={() => handleReVerificationCode()}
            style={{
              fontFamily: font.preReg,
              color: '#727272',
              textDecorationLine: 'underline',
            }}>
            인증번호 재전송
          </Text>
          <Text
            onPress={() => navigation.goBack()}
            style={{
              fontFamily: font.preReg,
              color: '#727272',
              textDecorationLine: 'underline',
            }}>
            핸드폰번호 다시 입력하기
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            // isNextPossible === '#25A765' ? handleNextPage() : undefined;
            if (isNextPossible === '#25A765') {
              handleNextPage();
            } else {
              startShakeAnimation();
            }
          }}
          style={{
            height:
              Platform.OS === 'ios' ? 48 + ios.BOTTOM_INDICATOR_HEIGHT : 48,
            position: 'absolute',
            bottom: 0,
            width: '100%',
            justifyContent: 'center',
            backgroundColor: isNextPossible,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: font.preReg,
              color: isNextPossible === '#F2F2F2' ? '#000000' : '#ffffff',
              fontSize: 14,
              lineHeight: 16.71,
              paddingBottom:
                Platform.OS === 'ios' ? ios.BOTTOM_INDICATOR_HEIGHT : undefined,
            }}>
            인증하기
          </Text>
        </Pressable>
      </SafeAreaView>
    </Pressable>
  );
};

export default VerificationCode;
