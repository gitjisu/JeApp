import {
  View,
  Text,
  Animated,
  Pressable,
  Image,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
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

type Props = {
  navigation: AppNavigationType;
};

const Interest = ({navigation}: Props) => {
  const INTEREST = [
    '등산',
    '골프',
    '자전거',
    '축구',
    '당구/포켓볼',
    '볼링',
    '탁구',
    '배드민턴',
    '테니스/스쿼시',
    '걷기/러닝/마라톤',
    '야구',
    '축구/풋살',
    '헬스/뷰티/요가',
    '게이트볼',
    '승마',
    '여행',
    '낚시',
    '독서',
    '노래/보컬',
    '악기/밴드',
    '그림&스케치',
    '사교&인맥',
    '반려동물',
    '외국어',
    '영화&연극&꽁연',
    '댄스&무용',
    '봉사활동',
    '차&오토바이',
    '사진&영상',
    '야구 관람',
    '바둑&장기&보드게임',
    '요리&베이킹',
    '공부&자기개발',
  ];

  const dispatch = useAppDispatch();
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [isNextPossible, setIsNextPossible] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (selectedValue.length) {
      setIsNextPossible(true);
    } else {
      setIsNextPossible(false);
    }
  }, [selectedValue]);

  const handleSetSelectedValue = (interest: string) => {
    if (!selectedValue.includes(interest)) {
      const updatedValues = [...selectedValue, interest];
      if (updatedValues.length <= 8) {
        setSelectedValue(updatedValues);
      } else {
        startShakeAnimation();
      }
    } else {
      const updatedValues = selectedValue.filter(item => item !== interest);
      setSelectedValue(updatedValues);
    }

    scrollViewRef.current?.scrollToEnd({animated: true});
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

  const handleNextPage = () => {
    dispatch(authSlice.actions.setInterest({interest: [...selectedValue]}));
    navigation.navigate('Region');
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
          관심있는 분야를{'\n'}선택해주세요 {'(최대 8개)'}
        </Text>
      </Animated.View>

      <View
        style={{
          marginTop: 16,
          marginHorizontal: 32,
          backgroundColor: '#f5f5f5',
          height: 81,
        }}>
        <View style={{paddingTop: 6, paddingLeft: 13}}>
          <Text
            style={{
              fontFamily: font.preReg,
              fontSize: 14,
              lineHeight: 30,
            }}>
            선택한 관심사
          </Text>
        </View>
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          style={{marginHorizontal: 15}}>
          {selectedValue.map((interest, index) => (
            <Pressable
              key={index}
              onPress={() => {
                handleSetSelectedValue(interest);
              }}
              style={{marginRight: 10}}>
              <Text
                style={{
                  fontFamily: font.preReg,
                  fontSize: 14,
                  justifyContent: 'center',
                  textAlignVertical: 'center',
                  lineHeight: 40,
                }}>
                {interest}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View
        style={{
          marginHorizontal: 32,
          marginTop: 9,
        }}>
        <Text
          style={{
            fontFamily: font.preReg,
            fontSize: 14,
            lineHeight: 30,
          }}>
          주제
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {INTEREST.map((interest, index) => (
            <Pressable
              onPress={() => {
                handleSetSelectedValue(interest);
              }}
              key={index}
              style={{
                backgroundColor: '#d9d9d9',
                marginRight: 10,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontFamily: font.preReg,
                  fontSize: 14,
                  lineHeight: 30,
                }}>
                {interest}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable
        onPress={() => {
          // isNextPossible === '#25A765' ? handleNextPage() : undefined;
          if (isNextPossible) {
            handleNextPage();
          } else {
            startShakeAnimation();
          }
        }}
        style={{
          height: Platform.OS === 'ios' ? 48 + ios.BOTTOM_INDICATOR_HEIGHT : 48,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'center',
          backgroundColor: isNextPossible ? '#25a765' : '#f2f2f2',
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

export default Interest;
