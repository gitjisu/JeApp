import {View, Text, Pressable, Platform, Image, Animated} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {AppNavigationType} from '../../../navigation/StackBase';
import {SafeAreaView} from 'react-native-safe-area-context';
import {font} from '../../../styles/globalStyles';
// 3rd party
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {ios} from '../../../styles/iosTheme';

//components
import BackButton from '../../../components/UI/BackButton';

type Props = {
  navigation: AppNavigationType;
};

const Agreement = ({navigation}: Props) => {
  const [isAllChecked, setIsAllChecked] = useState<boolean | undefined>(false);
  const [firstChecked, setFirstChecked] = useState<boolean | undefined>(false);
  const [secondChecked, setSecondChecked] = useState<boolean | undefined>(
    false,
  );
  const [thirdChecked, setThirdChecked] = useState<boolean | undefined>(false);
  const [fourthChecked, setFourthChecked] = useState<boolean | undefined>(
    false,
  );
  const [fifthChecked, setFifthChecked] = useState<boolean | undefined>(false);
  const [isNextPossible, setIsNextPossible] = useState<boolean>(false);

  const [textWidth, setTextWidth] = useState(0);
  const handleSetAllChecked = () => {
    if (isAllChecked) {
      setIsAllChecked(false);
      setFirstChecked(false);
      setSecondChecked(false);
      setThirdChecked(false);
      setFourthChecked(false);
      setFifthChecked(false);
    } else {
      setIsAllChecked(true);
      setFirstChecked(true);
      setSecondChecked(true);
      setThirdChecked(true);
      setFourthChecked(true);
      setFifthChecked(true);
    }
  };

  useEffect(() => {
    // Check if first, second, and third are all true
    if (firstChecked && secondChecked && thirdChecked) {
      setIsNextPossible(true);
    } else {
      setIsNextPossible(false);
    }
  }, [firstChecked, secondChecked, thirdChecked]);

  // color Animation
  const backgroundColorAnim = useRef(
    new Animated.Value(isNextPossible ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(backgroundColorAnim, {
      toValue: isNextPossible ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isNextPossible, backgroundColorAnim]);

  const interpolatedColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#beebd4', '#25a765'],
  });

  const interpolateText = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(textWidth + 8)],
  });

  const interpolateOpacityIn = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const interpolateOpacityOut = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  useEffect(() => {
    const areAllChecked =
      fifthChecked &&
      secondChecked &&
      thirdChecked &&
      fourthChecked &&
      fifthChecked;
    setIsAllChecked(areAllChecked);
  }, [fifthChecked, secondChecked, thirdChecked, fourthChecked, fifthChecked]);

  const handleNextPage = () => {
    navigation.navigate('AuthenticationPhoneNumber');
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#ffffff',
        flex: 1,
      }}>
      {/* 뒤로가기버튼 */}
      <BackButton navigation={navigation} />
      {/* <Pressable
        onPress={() => navigation.navigate('Test')}
        style={{borderWidth: 1, height: 10, width: 10}}>
        <Text> 웹뷰</Text>
      </Pressable> */}
      {/* 문구 */}
      <View style={{marginTop: 35, paddingHorizontal: 32}}>
        <Text
          style={{
            fontSize: 20,
            lineHeight: 30,
            fontFamily: font.preReg,
            color: '#000000',
          }}>
          오이를 사용하기 위해 {'\n'}
          회원님의 정보가 필요해요{textWidth}
        </Text>
      </View>

      {/* 모두동의 */}
      <View
        style={{
          paddingHorizontal: 32,
          marginTop: 223,
        }}>
        <BouncyCheckbox
          style={{
            ...Platform.select({
              ios: {
                shadowColor: '#171717',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 3,
              },
              android: {
                elevation: 5,
                shadowColor: '#171717',
              },
            }),
            backgroundColor: '#f2f2f2',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 14,
          }}
          fillColor={'#f2f2f2'}
          size={25}
          innerIconStyle={{borderColor: isAllChecked ? '#25A765' : '#D9D9D9'}}
          isChecked={isAllChecked}
          onPress={handleSetAllChecked}
          text="모두 동의합니다."
          textStyle={{
            fontFamily: font.preReg,
            fontSize: 14,
            lineHeight: 16.71,
            color: '#000000',
            alignSelf: 'center',
            textDecorationLine: 'none',
          }}
          iconComponent={
            isAllChecked ? (
              <Image
                source={require('../../../assets/checkGreen.png')}
                style={{width: 20, height: 20, marginTop: 4}}
              />
            ) : (
              <Image
                source={require('../../../assets/checkGray.png')}
                style={{width: 20, height: 20, marginTop: 4}}
              />
            )
          }></BouncyCheckbox>
      </View>
      {/* 동의항목 - 이용약관*/}
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 32,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <BouncyCheckbox
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          fillColor={'#ffffff'}
          size={25}
          innerIconStyle={{borderColor: '#ffffff'}}
          isChecked={firstChecked}
          onPress={() => setFirstChecked(prev => !prev)}
          text="이용약관(필수)"
          textStyle={{
            fontFamily: font.preReg,
            fontSize: 14,
            lineHeight: 16.71,
            color: '#000000',
            alignSelf: 'center',
            textDecorationLine: 'none',
          }}
          iconComponent={
            firstChecked ? (
              <Image
                source={require('../../../assets/checkGreen.png')}
                style={{width: 20, height: 20, marginTop: 4}}
              />
            ) : (
              <Image
                source={require('../../../assets/checkGray.png')}
                style={{width: 20, height: 20, marginTop: 4}}
              />
            )
          }></BouncyCheckbox>
        <Image
          source={require('../../../assets/arrowRight.png')}
          style={{width: 16, height: 16}}
        />
      </View>
      {/* 동의항목 - 만 14세 */}
      <View
        style={{
          marginTop: 8,
          paddingHorizontal: 32,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <BouncyCheckbox
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          fillColor={'#ffffff'}
          size={25}
          innerIconStyle={{borderColor: '#ffffff'}}
          isChecked={secondChecked}
          onPress={() => setSecondChecked(prev => !prev)}
          text="만 14세 이상입니다(필수)"
          textStyle={{
            fontFamily: font.preReg,
            fontSize: 14,
            lineHeight: 16.71,
            color: '#000000',
            alignSelf: 'center',
            textDecorationLine: 'none',
          }}
          iconComponent={
            secondChecked ? (
              <Image
                source={require('../../../assets/checkGreen.png')}
                style={{width: 20, height: 20, marginTop: 4}}
              />
            ) : (
              <Image
                source={require('../../../assets/checkGray.png')}
                style={{width: 20, height: 20, marginTop: 4}}
              />
            )
          }></BouncyCheckbox>
        <Image
          source={require('../../../assets/arrowRight.png')}
          style={{width: 16, height: 16}}
        />
      </View>
      {/* 동의항목 - 개인정보수집 */}
      <View
        style={{
          marginTop: 8,
          paddingHorizontal: 32,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <BouncyCheckbox
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          fillColor={'#ffffff'}
          size={25}
          innerIconStyle={{borderColor: '#ffffff'}}
          isChecked={thirdChecked}
          onPress={() => setThirdChecked(prev => !prev)}
          text="개인정보 수집(필수)"
          textStyle={{
            fontFamily: font.preReg,
            fontSize: 14,
            lineHeight: 16.71,
            color: '#000000',
            alignSelf: 'center',
            textDecorationLine: 'none',
          }}
          iconComponent={
            thirdChecked ? (
              <Image
                source={require('../../../assets/checkGreen.png')}
                style={{width: 20, height: 20, marginTop: 4}}
              />
            ) : (
              <Image
                source={require('../../../assets/checkGray.png')}
                style={{width: 20, height: 20, marginTop: 4}}
              />
            )
          }></BouncyCheckbox>
        <Image
          source={require('../../../assets/arrowRight.png')}
          style={{width: 16, height: 16}}
        />
      </View>
      {/* 동의항목 - 선택정보 수집 */}
      <View
        style={{
          marginTop: 8,
          paddingHorizontal: 32,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <BouncyCheckbox
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          fillColor={'#ffffff'}
          size={25}
          innerIconStyle={{borderColor: '#ffffff'}}
          isChecked={fourthChecked}
          onPress={() => setFourthChecked(prev => !prev)}
          text="선택정보 수집(선택)"
          textStyle={{
            fontFamily: font.preReg,
            fontSize: 14,
            lineHeight: 16.71,
            color: '#000000',
            alignSelf: 'center',
            textDecorationLine: 'none',
          }}
          iconComponent={
            fourthChecked ? (
              <Image
                source={require('../../../assets/checkGreen.png')}
                style={{width: 20, height: 20, marginTop: 4}}
              />
            ) : (
              <Image
                source={require('../../../assets/checkGray.png')}
                style={{width: 20, height: 20, marginTop: 4}}
              />
            )
          }></BouncyCheckbox>
        <Image
          source={require('../../../assets/arrowRight.png')}
          style={{width: 16, height: 16}}
        />
      </View>
      {/* 동의항목 - 마케팅 동의 */}
      <View
        style={{
          marginTop: 8,
          paddingHorizontal: 32,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <BouncyCheckbox
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          fillColor={'#ffffff'}
          size={25}
          innerIconStyle={{borderColor: '#ffffff'}}
          isChecked={fifthChecked}
          onPress={() => setFifthChecked(prev => !prev)}
          text="마케팅 동의(선택)"
          textStyle={{
            fontFamily: font.preReg,
            fontSize: 14,
            lineHeight: 16.71,
            color: '#000000',
            alignSelf: 'center',
            textDecorationLine: 'none',
          }}
          iconComponent={
            fifthChecked ? (
              <Image
                source={require('../../../assets/checkGreen.png')}
                style={{width: 20, height: 20, marginTop: 4}}
              />
            ) : (
              <Image
                source={require('../../../assets/checkGray.png')}
                style={{width: 20, height: 20, marginTop: 4}}
              />
            )
          }></BouncyCheckbox>
        <Image
          source={require('../../../assets/arrowRight.png')}
          style={{width: 16, height: 16}}
        />
      </View>
      <Pressable
        onPress={() => {
          isNextPossible ? handleNextPage() : undefined;
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <Animated.View
          style={{
            height:
              Platform.OS === 'ios' ? 48 + ios.BOTTOM_INDICATOR_HEIGHT : 48,
            justifyContent: 'center',
            backgroundColor: interpolatedColor,
            paddingBottom:
              Platform.OS === 'ios' ? ios.BOTTOM_INDICATOR_HEIGHT : undefined,
            flexDirection: 'row',
          }}>
          <Animated.Text
            onLayout={event => {
              setTextWidth(event.nativeEvent.layout.width);
            }}
            style={{
              textAlign: 'center',
              fontFamily: font.preReg,
              color: '#ffffff',
              fontSize: 14,
              lineHeight: 16.71,
              alignSelf: 'center',
              marginLeft: textWidth,
              transform: [{translateX: interpolateText}],
              opacity: interpolateOpacityOut,
            }}>
            다음
          </Animated.Text>
          <Animated.Text
            style={{
              textAlign: 'center',
              fontFamily: font.preReg,
              color: '#ffffff',
              fontSize: 14,
              lineHeight: 16.71,
              alignSelf: 'center',
              marginLeft: 8,
              transform: [{translateX: interpolateText}],
              opacity: interpolateOpacityIn,
            }}>
            다음
          </Animated.Text>
        </Animated.View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Agreement;
