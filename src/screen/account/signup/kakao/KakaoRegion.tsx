import {
  View,
  Text,
  Animated,
  FlatList,
  Pressable,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useMemo, useRef, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
// component
import {AppNavigationType} from '../../../../navigation/StackBase';
import BackButton from '../../../../components/UI/BackButton';
import NextButton from '../../../../components/UI/NextButton';
import {font} from '../../../../styles/globalStyles';

// json
import {
  filterRegionKeysEndingWith00,
  filterMinorRegionByMajorCode,
} from '../../../../assets/json/regionFuction';
import regionCode from '../../../../assets/json/regionCode.json';

//modal
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheetTimingConfigs,
  BottomSheetFlatList,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {Easing} from 'react-native-reanimated';

// api
import {useAppDispatch} from '../../../../store';
import authSlice from '../../../../slices/auth';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/reducer';
import authApiController from '../../../../api/controller/auth';
import {setItem} from '../../../../store/localStorage';
import userSlice from '../../../../slices/user';

type Props = {
  navigation: AppNavigationType;
};

type RegionJson = {
  [key: string]: {
    name: string;
    nameFull: string;
  };
};

const KakaoRegion = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  // 모달
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
  const [regionEndingWith00, setRegionEndingWith00] = useState<{
    [key: string]: any;
  }>({});
  const [tempMajor, setTempMajor] = useState({});
  const [minorList, setMinorList] = useState({});
  const [major, setMajor] = useState<RegionJson>({});
  const [minor, setMinor] = useState<RegionJson>({});
  const [isNextPossible, setIsNextPossible] = useState(false);

  useEffect(() => {
    const result = filterRegionKeysEndingWith00(regionCode);
    setRegionEndingWith00(result);
  }, []);

  const handleSetMajor = (major: RegionJson) => {
    setTempMajor(major);
    setMinorList(
      filterMinorRegionByMajorCode(Object.keys(major)[0], regionCode),
    );
    handlePresentModalPress();
  };

  const handleSetMinor = (minor: RegionJson) => {
    setMajor(tempMajor);
    setMinor(minor);
    bottomSheetModalRef.current?.close();
    setIsNextPossible(true);
    const key = Object.keys(minor)[0];
    dispatch(authSlice.actions.setRegionCode({regionCode: key}));
  };

  // shake animation
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
    const response = await authApiController['3'](payload);
    if (response != null) {
      navigation.navigate('SignupComplete', {response});
    } else {
      Alert.alert('인터넷연결끊김', '회원가입 실패 네트워크를 확인해주세요', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
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
          카카오가입{'\n'}
          사는 지역을 설정해주세요
        </Text>
      </Animated.View>

      {major && minor && (
        <View
          style={{paddingHorizontal: 32, marginTop: 32, flexDirection: 'row'}}>
          {Object.keys(major).map(majorKey => (
            <Text
              key={majorKey}
              style={{fontFamily: font.preBold, fontSize: 24}}>
              {major[majorKey].nameFull} {'> '}
            </Text>
          ))}
          {Object.keys(minor).map(minorKey => (
            <Text
              key={minorKey}
              style={{fontFamily: font.preBold, fontSize: 24}}>
              {minor[minorKey].nameFull}
            </Text>
          ))}
        </View>
      )}

      <View
        style={{
          marginHorizontal: 32,
          marginTop: 25,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {regionEndingWith00.length > 0 &&
          regionEndingWith00.map((region: RegionJson, index: number) => {
            const key = Object.keys(region)[0];
            const {name} = region[key];
            return (
              <Pressable
                onPress={() => {
                  handleSetMajor(region);
                }}
                key={index}
                style={{width: '33.333%', backgroundColor: '#d9d9d9'}}>
                <Text
                  style={{
                    fontFamily: font.preReg,
                    fontSize: 18,
                    lineHeight: 50,
                    textAlign: 'center',
                  }}>
                  {name}
                </Text>
              </Pressable>
            );
          })}
      </View>

      <BottomSheetModal
        index={0}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{backgroundColor: 'red'}}
        style={{borderRadius: 40, overflow: 'hidden'}}>
        <BottomSheetFlatList
          data={minorList as RegionJson[]}
          renderItem={({item}: {item: RegionJson}) => (
            <TouchableOpacity
              onPress={() => {
                handleSetMinor(item);
              }}
              style={{paddingLeft: 34, paddingBottom: 30}}>
              <Text>{item[Object.keys(item)[0]].nameFull}</Text>
            </TouchableOpacity>
          )}
          style={{marginVertical: 32}}
        />
      </BottomSheetModal>

      <NextButton
        isNextPossible={isNextPossible}
        nextButtonText="다음"
        handleNextPage={handleNextPage}
        shakeAnimation={startShakeAnimation}
      />
    </SafeAreaView>
  );
};

export default KakaoRegion;
