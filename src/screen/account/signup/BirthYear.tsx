import {
  View,
  Text,
  Platform,
  Pressable,
  Image,
  BackHandler,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useState, useMemo, useRef, useCallback, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

//component
import BackButton from '../../../components/UI/BackButton';
import {AppNavigationType} from '../../../navigation/StackBase';
import {ios} from '../../../styles/iosTheme';
import {font} from '../../../styles/globalStyles';

//api
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer';
import {useAppDispatch} from '../../../store';

// 3rd party
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetTimingConfigs,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';

import {Easing} from 'react-native-reanimated';
import authSlice from '../../../slices/auth';

type Props = {
  navigation: AppNavigationType;
};

const BirthYear = ({navigation}: Props) => {
  const dispatch = useAppDispatch();

  const [year, setYear] = useState<number | string>('출생년도');
  const [isNextPossible, setIsNextPossible] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['65%'], []);
  const YEAR_DATA = useMemo(() => {
    const startYear = 1950;
    const endYear = 2008;
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }

    return years;
  }, []);

  const handleSetYear = (item: number) => {
    setYear(item);
    setIsNextPossible(true);
  };

  const renderItem = useCallback(
    ({item: yearItem}: {item: number}) => (
      <TouchableOpacity
        style={{paddingLeft: 34, paddingBottom: 30}}
        onPress={item => {
          handleSetYear(yearItem);
          bottomSheetModalRef.current?.close();
        }}>
        <Text
          style={{
            fontFamily: font.preReg,
            fontSize: 18,
            color: '#000000',
          }}>
          {yearItem}년
        </Text>
      </TouchableOpacity>
    ),
    [],
  );

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

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
  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 400,
    easing: Easing.ease,
  });
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

  const handleNextPage = () => {
    dispatch(authSlice.actions.setBirthYear({birthYear: year}));
    navigation.navigate('Gender');
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
          출생년도를 선택해주세요
        </Text>
      </Animated.View>

      <Pressable
        style={{paddingHorizontal: 32, paddingVertical: 16}}
        onPress={handlePresentModalPress}>
        <View
          style={{
            height: 48,
            borderColor: '#F2F2F2',
            backgroundColor: '#F2F2F2',
            borderWidth: 1,
            paddingLeft: 16,
          }}>
          <Text
            style={{
              lineHeight: 48,
              fontFamily: font.preReg,
            }}>
            {year === '출생년도' ? '출생년도' : `${year}년`}
          </Text>
          <View
            style={{
              position: 'absolute',
              right: 16,
              width: 20,
              height: '100%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: '#D9D9D9',
              }}></View>
          </View>
          {/* <View
            style={{
              position: 'absolute',
              right: 16,
              height: '100%',
              justifyContent: 'center',
            }}>
            <Image
              style={{width: 16, height: 16}}
              source={require('../../../assets/arrowBottom.png')}></Image>
          </View> */}
        </View>
      </Pressable>

      <BottomSheetModal
        index={0}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        animationConfigs={animationConfigs}
        handleIndicatorStyle={{backgroundColor: 'red'}}
        style={{borderRadius: 40, overflow: 'hidden', paddingHorizontal: 32}}>
        <BottomSheetFlatList
          data={YEAR_DATA}
          renderItem={renderItem}
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

export default BirthYear;
