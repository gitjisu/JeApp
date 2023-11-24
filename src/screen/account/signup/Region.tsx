import {
  View,
  Text,
  Animated,
  Pressable,
  Image,
  Platform,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
//component
import BackButton from '../../../components/UI/BackButton';
import {AppNavigationType} from '../../../navigation/StackBase';
import {ios} from '../../../styles/iosTheme';
import {font} from '../../../styles/globalStyles';
//api
import {useAppDispatch} from '../../../store';
import authSlice from '../../../slices/auth';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer';
import {FlatList} from 'react-native-gesture-handler';

//3rd party
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheetTimingConfigs,
  BottomSheetFlatList,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {Easing} from 'react-native-reanimated';

import {
  typeMajor,
  MAJOR,
  typeMinor,
  MinorItem,
  returnMinorByMajorCode,
} from '../../../assets/js/region';
import authApiController from '../../../api/controller/auth';

//storage
import {setItem} from '../../../store/localStorage';
import userSlice from '../../../slices/user';

type Props = {
  navigation: AppNavigationType;
};

const Region = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [tempMajor, setTempMajor] = useState<typeMajor | null>(null);
  const [major, setMajor] = useState<typeMajor | null>(null);
  const [minorList, setMinorList] = useState<typeMinor | null>(null);
  const [minor, setMinor] = useState<MinorItem | null>(null);
  const [isNextPossible, setIsNextPossible] = useState<boolean>(false);
  // 바텀시트관련
  const snapPoints = useMemo(() => ['65%'], []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 400,
    easing: Easing.ease,
  });
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );
  useEffect(() => {
    const backAction = () => {
      bottomSheetModalRef.current?.close();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleSetMajor = (major: typeMajor) => {
    //major에 맞는 minor들 불러오기
    setTempMajor(major);
    const result = returnMinorByMajorCode(major.code);
    setMinorList(result);
    handlePresentModalPress();
  };

  const handleSetMinor = (minor: MinorItem) => {
    bottomSheetModalRef.current?.close();
    setMinor(minor);
    setMajor(tempMajor);
    setIsNextPossible(true);
    if (minor && tempMajor) {
      console.log(tempMajor.code + minor.code);
      dispatch(
        authSlice.actions.setRegionCode({
          regionCode: tempMajor.code + minor.code,
        }),
      );
    }
  };

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

  const auth = useSelector((state: RootState) => state.auth);
  const handleNextPage = async () => {
    const payload = {
      phone: auth.phone,
      nickname: auth.nickname,
      image: auth.profileImage,
      birthYear: auth.birthYear,
      interestList: auth.interest,
      fcmToken: '',
      regionCode: auth.regionCode,
      gender: auth.gender,
      agreeFcmAd: true,
      adid: '',
    };

    console.log(payload);
    const response = await authApiController['3'](payload);
    if (response != null) {
      console.log('이게유저다!!!!!', response);
      setItem('refreshToken', response.refreshToken);
      dispatch(
        userSlice.actions.setAccessToken({
          accessToken: response.accessToken,
        }),
      );
      dispatch(
        userSlice.actions.setUser({
          user: response.user,
        }),
      );
      navigation.navigate('SignupComplete');
    } else {
      console.log('가입실패');
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
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
          사는 지역을 설정해주세요
        </Text>
      </Animated.View>

      {major && minor && (
        <View style={{paddingHorizontal: 32, marginTop: 32}}>
          <Text>
            {major.fullName} {'>'} {minor.fullName}
          </Text>
        </View>
      )}

      <View
        style={{
          marginHorizontal: 32,
          marginTop: 25,
          flexDirection: 'row',
        }}>
        <FlatList
          data={MAJOR}
          numColumns={3}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                handleSetMajor(item);
              }}
              style={{
                flex: 1,
                backgroundColor: '#d9d9d9',
              }}>
              <Text
                style={{
                  fontFamily: font.preReg,
                  fontSize: 18,
                  lineHeight: 50,
                  textAlign: 'center',
                }}>
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      </View>

      <BottomSheetModal
        index={0}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{backgroundColor: 'red'}}
        style={{borderRadius: 40, overflow: 'hidden'}}>
        <BottomSheetFlatList
          data={minorList || [{name: '없음'}]}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                handleSetMinor(item);
              }}
              style={{paddingLeft: 34, paddingBottom: 30}}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={{marginVertical: 32}}
        />
      </BottomSheetModal>

      <Pressable
        onPress={() => {
          isNextPossible ? handleNextPage() : startShakeAnimation();
        }}
        style={{
          height: Platform.OS === 'ios' ? 48 + ios.BOTTOM_INDICATOR_HEIGHT : 48,
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
          다음
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Region;
