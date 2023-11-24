import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {font} from '../../../styles/globalStyles';
//components
import BackButton from '../../../components/UI/BackButton';
import {AppNavigationType} from '../../../navigation/StackBase';
import {ios} from '../../../styles/iosTheme';

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

  const handleNextPage = () => {
    // 인증번호 요청
    const payload = {
      phone: number,
    };
    authApiController['1'](payload);
    dispatch(authSlice.actions.setPhone({phone: number}));
    navigation.navigate('VerificationCode');
  };
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
        <Pressable
          onPress={() => {
            isNextPossible ? handleNextPage() : undefined;
          }}
          style={{
            height:
              Platform.OS === 'ios' ? 48 + ios.BOTTOM_INDICATOR_HEIGHT : 48,
            position: 'absolute',
            bottom: 0,
            width: '100%',
            justifyContent: 'center',
            backgroundColor: isNextPossible ? '#25a765' : '#F2F2F2',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: font.preReg,
              color: isNextPossible ? '#ffffff' : '#000000',
              fontSize: 14,
              lineHeight: 16.71,
              paddingBottom:
                Platform.OS === 'ios' ? ios.BOTTOM_INDICATOR_HEIGHT : undefined,
            }}>
            인증번호 받기
          </Text>
        </Pressable>
      </SafeAreaView>
    </Pressable>
  );
};

export default AuthenticationPhoneNumber;
