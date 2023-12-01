import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppNavigationType, AppRouteProp} from '../../../navigation/StackBase';
import authApiController from '../../../api/controller/auth';
import {format} from '../../../util/date';

import {SafeAreaView} from 'react-native-safe-area-context';

// component
import BackButton from '../../../components/UI/BackButton';
import {font} from '../../../styles/globalStyles';

type Props = {
  navigation: AppNavigationType;
  route: AppRouteProp.Ban;
};

const Ban = ({navigation, route}: Props) => {
  const params = route.params;
  const [reasone, setReason] = useState<string | undefined>(undefined);
  const [startAt, setStartAt] = useState<string>('');
  const [until, setUntil] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authApiController[155](params.id);
        if (response?.comment) {
          setReason(response?.comment);
        }
        if (response?.startAt) {
          setStartAt(format['yyyy년 MM월 dd일'](new Date(response?.startAt)));
        }
        if (response?.until) {
          setUntil(format['yyyy년 MM월 dd일'](new Date(response?.until)));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 함수 실행

    // Cleanup 함수 (Unmount 시에 호출됨)
    return () => {
      // 취소 또는 정리 작업
    };
  }, [params.id]); // 의존성 배열

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButton navigation={navigation} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../../assets/il_oe_signBoard_ban.png')}
          style={{
            width: 160,
            marginBottom: 12,
            position: 'relative',
            left: 30,
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontFamily: font.preBold,
            fontSize: 20,
            lineHeight: 30,
          }}>
          운영정책 위반으로 {'\n'}이용이 제한된 계정입니다.
        </Text>
        <View
          style={{
            marginVertical: 16,
            padding: 32,
            backgroundColor: '#fafafa',
          }}>
          <View style={{flexDirection: 'row', paddingBottom: 8}}>
            <Text
              style={{
                fontFamily: font.preReg,
                color: '#767676',
                fontSize: 14,
                lineHeight: 20,
                paddingRight: 12,
              }}>
              제한일시
            </Text>
            <Text
              style={{
                fontFamily: font.preReg,
                color: '#333',
                fontSize: 14,
                lineHeight: 20,
              }}>
              {startAt}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingBottom: 8}}>
            <Text
              style={{
                fontFamily: font.preReg,
                color: '#767676',
                fontSize: 14,
                lineHeight: 20,
                paddingRight: 12,
              }}>
              해제 일시
            </Text>
            <Text
              style={{
                fontFamily: font.preReg,
                color: '#333',
                fontSize: 14,
                lineHeight: 20,
              }}>
              {until ? until : '영구정지'}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: font.preReg,
                color: '#767676',
                fontSize: 14,
                lineHeight: 20,
                paddingRight: 12,
              }}>
              정지 사유
            </Text>
            <Text
              style={{
                fontFamily: font.preReg,
                color: '#333',
                fontSize: 14,
                lineHeight: 20,
              }}>
              {reasone}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Ban;
