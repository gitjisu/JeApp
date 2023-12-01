import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {font} from '../../../styles/globalStyles';
//components
import BackButton from '../../../components/UI/BackButton';
import {AppNavigationType} from '../../../navigation/StackBase';
import {ios} from '../../../styles/iosTheme';
import NextButton from '../../../components/UI/NextButton';
// api
import authApiController from '../../../api/controller/auth';
import {useAppDispatch} from '../../../store';
import authSlice from '../../../slices/auth';

type Props = {
  navigation: AppNavigationType;
};
const AuthenticationPhoneNumber = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [number, setNumber] = useState<string>('010');
  const [isNextPossible, setIsNextPossible] = useState(false);

  const handleInputChange = (text: string) => {
    // 정규 표현식을 사용하여 숫자만 입력받도록 설정
    const isValidPhoneNumber = /^010\d{8}$/.test(text);
    const numericInput = text.replace(/[^0-9]/g, '');
    setNumber(numericInput);
    setIsNextPossible(isValidPhoneNumber);
  };

  const handleNextPage = async () => {
    const payload = {
      phone: number,
    };
    // 1주일 내 탈퇴한 회원이면 Alert
    const response = await authApiController['8'](payload);
    if (response?.existence) {
      Alert.alert('가입불가', '1주일 이내 탈퇴 유저라능', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
    } else {
      // 아니면인증번호 요청
      authApiController['1'](payload);
      dispatch(authSlice.actions.setPhone({phone: number}));
      navigation.navigate('VerificationCode');
    }
  };

  const [nextButtonText] = useState('인증번호받기');
  return (
    <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{
          backgroundColor: '#ffffff',
          flex: 1,
        }}>
        {/* 뒤로가기버튼 */}
        <BackButton navigation={navigation} />
        {/* 문구 */}
        <View style={{marginTop: 35, paddingHorizontal: 32}}>
          <Text
            style={{
              fontSize: 20,
              lineHeight: 30,
              fontFamily: font.preReg,
              color: '#000000',
            }}>
            핸드폰 번호를 입력해주세요
          </Text>
        </View>

        {/* 핸드폰 입력 인풋 필드 */}
        <Pressable style={{paddingHorizontal: 32, paddingTop: 16}}>
          <TextInput
            keyboardType="numeric"
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
        </Pressable>

        {/* 다음버튼 */}
        <NextButton
          isNextPossible={isNextPossible}
          handleNextPage={handleNextPage}
          nextButtonText={nextButtonText}
        />
      </SafeAreaView>
    </Pressable>
  );
};

export default AuthenticationPhoneNumber;
