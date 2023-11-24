import {View, Text, Animated, Pressable, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

//component
import BackButton from '../../../components/UI/BackButton';
import {AppNavigationType} from '../../../navigation/StackBase';
import {ios} from '../../../styles/iosTheme';
import {font} from '../../../styles/globalStyles';

//api
import {useAppDispatch} from '../../../store';
import authSlice from '../../../slices/auth';

type Props = {
  navigation: AppNavigationType;
};

const Gender = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [gender, setGender] = useState<number | null>(null);
  const [isNextPossible, setIsNextPossible] = useState<boolean>(false);
  const [shakeAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (gender) {
      setIsNextPossible(true);
    }
  }, [gender]);

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
    dispatch(authSlice.actions.setGender({gender: gender}));
    navigation.navigate('ProfileImage')
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
          성별을 알려주세요
        </Text>
      </Animated.View>

      <View
        style={{
          marginTop: 25,
          flexDirection: 'row',
          paddingHorizontal: 32,
        }}>
        <Pressable
          onPress={() => setGender(1)}
          style={{
            backgroundColor: gender === 1 ? '#25a765' : '#F2F2F2',
            height: 48,
            width: '50%',
            marginRight: 8,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: font.preReg,
              textAlign: 'center',
              fontSize: 20,
            }}>
            남
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setGender(2)}
          style={{
            backgroundColor: gender === 2 ? '#25a765' : '#F2F2F2',
            height: 48,
            width: '50%',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: font.preReg,
              textAlign: 'center',
              fontSize: 20,
            }}>
            여
          </Text>
        </Pressable>
      </View>

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

export default Gender;
