import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
  TextInput,
  Dimensions,
  ImageBackground,
  NativeSyntheticEvent,
  TextLayoutEventData,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import {
  font,
  layout,
  widthPercentage2,
  heightPercentage2,
  fontPercentage2,
} from '../../styles/globalStyles';
import {ios} from '../../styles/iosTheme';
import {AppNavigationType, AppRouteProp} from '../../navigation/StackBase';
import HighlightText from 'react-native-highlight-underline-text';
import LinearGradient from 'react-native-linear-gradient';

import {useWindowDimensions} from 'react-native';
import {all} from 'axios';

import Type4 from '../../components/main/Home/Type4';
import Type5 from '../../components/main/Home/Type5';
import Type6 from '../../components/main/Home/Type6';
type Props = {
  navigation: AppNavigationType;
  route: AppRouteProp.Home;
};

const Home = ({navigation, route}: Props) => {
  const param = route.params;
  const user = useSelector((state: RootState) => state.user.user);
  const onTextLayoutInAndroid = (
    e: NativeSyntheticEvent<TextLayoutEventData>,
  ) => {
    setAllLines(e.nativeEvent.lines.length);
    setIsTruncated(e.nativeEvent.lines.length > numberOfLines);
  };
  const onTextLayoutInIOS = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    setAllLines(e.nativeEvent.lines.length);
    setIsTruncated(e.nativeEvent.lines.length > numberOfLines);
  };
  const numberOfLines = 2;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isTruncated, setIsTruncated] = useState<boolean>(false);
  const [allLines, setAllLines] = useState<number>(0);

  const [testH, setTestH] = useState<any>(heightPercentage2(320));

  const handleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const {height} = useWindowDimensions();

  const mounted = useRef(false);
  const animatedHeight = useRef(new Animated.Value(testH)).current;
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      const h = ((320 + (allLines - 2) * 22) / 800) * 100;
      const newH = height * (h / 100);
      Animated.timing(animatedHeight, {
        toValue: newH,
        easing: Easing.inOut(Easing.ease),
        duration: 300, // 애니메이션 지속 시간
        useNativeDriver: false, // 네이티브 드라이버 사용 여부
      }).start();

      setTestH(newH);
    }
  }, [isExpanded]);

  const childRef1 = useRef();
  const childRef2 = useRef();
  const childRef3 = useRef();
  const refreshComponent = () => {
    navigation.reset({
      routes: [{name: 'Home'}],
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* 알림 */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Image
            style={styles.bell}
            source={require('../../assets/bell.png')}></Image>
        </View>
        {/* <Type6
          navigation={navigation}
          ref={childRef3}
          refreshComponent={refreshComponent}
        />
        <Type5
          navigation={navigation}
          ref={childRef1}
          refreshComponent={refreshComponent}
        /> */}
        <Type4
          navigation={navigation}
          ref={childRef2}
          refreshComponent={refreshComponent}
        />
        {/* 모주 */}
        <View
          style={[
            styles.boxShadow,
            styles.card,
            {height: heightPercentage2(466), width: widthPercentage2(328)},
          ]}>
          <Image
            style={[styles.img, {height: heightPercentage2(259)}]}
            source={require('../../assets/img_class_moju_.png')}></Image>

          <View
            style={[styles.cntBoxMain, {height: heightPercentage2(466 - 259)}]}>
            <View style={styles.labelWrapper}>
              <View style={styles.labelClassWrapper}>
                <Text style={styles.labelClassText}>클래스</Text>
              </View>
              <View style={styles.labelRegionWrapper}>
                <Text style={styles.labelRegionText}>광주광역시 광산구</Text>
              </View>
            </View>
            <Text style={styles.classTtl}>나만의 전통주, 모주 만들기</Text>
            <View style={styles.classPS}>
              <Text style={styles.classPSText1}>27,000원</Text>
              <View style={styles.classPSInner}>
                <Text style={styles.classPSText2}>20,000원</Text>
                <Text style={styles.classPSText3}>참가 신청하기</Text>
              </View>
            </View>
          </View>
        </View>
        {/* 방명록 유도 카드 */}
        <View
          style={[
            styles.boxShadow,
            {
              width: widthPercentage2(328),
              borderRadius: 20,
              paddingTop: 40,
              paddingBottom: 60,
              paddingHorizontal: 40,
              alignSelf: 'center',
              backgroundColor: '#2c9ad8',
              marginBottom: 32,
            },
          ]}>
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: '#fff',
              marginBottom: 10,
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}>
            <Text
              style={{
                color: '#2c9ad8',
                fontFamily: font.preReg,
                fontSize: 12,
                lineHeight: 16,
              }}>
              신규 멤버
            </Text>
          </View>
          <View style={{marginBottom: 16}}>
            <Text
              style={{
                fontFamily: font.preBold,
                color: '#fff',
                fontSize: 24,
              }}>
              정모를 함께한 멤버에게
            </Text>
            <Text
              style={{
                fontFamily: font.preBold,
                color: '#fff',
                fontSize: 24,
              }}>
              방명록을 남겨보세요
            </Text>
          </View>
          <Text style={{marginBottom: 40, color: '#fff'}}>
            어떤 멤버인지 확인하기 {' > '}
          </Text>
          <View
            style={{
              flexDirection: 'row-reverse',
            }}>
            <View style={[{width: 160, height: 160}, styles.boxShadow]}>
              <Image
                source={require('../../assets/newmember.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 100,
                }}></Image>
            </View>
            <View style={{justifyContent: 'flex-end', right: 50}}>
              <ImageBackground
                style={{
                  minWidth: 80,
                  minHeight: 50,
                  paddingRight: 32,
                  paddingLeft: 16,
                  paddingTop: 8,
                  paddingBottom: 11,
                  justifyContent: 'center',
                }}
                resizeMode="stretch"
                source={require('../../assets/il_bg_signpost.png')}>
                <Text
                  style={{
                    color: '#505050',
                    fontSize: 14,
                    fontFamily: font.preBold,
                    letterSpacing: 0,
                    textAlign: 'center',
                  }}>
                  전정국이올시당!
                </Text>
              </ImageBackground>
            </View>
          </View>
        </View>
        {/* 소셜살롱 */}
        <View
          style={[
            styles.boxShadow,
            styles.card,
            {width: widthPercentage2(328)},
          ]}>
          <Image
            style={[styles.img, {height: heightPercentage2(259)}]}
            source={require('../../assets/overwatch.png')}></Image>

          <View style={[styles.cntBoxMain]}>
            <View style={styles.labelWrapper}>
              <View style={styles.labelSocialWrapper}>
                <Text style={styles.labelSocialText}>소셜살롱</Text>
              </View>
              <View style={styles.labelRegionWrapper}>
                <Text style={styles.labelRegionText}>리장 타워</Text>
              </View>
            </View>
            <Text style={styles.classTtl}>perfect night</Text>
            <View style={styles.classPS}>
              <Text style={styles.classPSText1}>27,000 크레딧</Text>
              <View style={styles.classPSInner}>
                <Text style={styles.classPSText2}>20,000 크레딧</Text>
                <Text style={styles.classPSText4}>참가 신청하기</Text>
              </View>
            </View>
          </View>
        </View>
        {/* 신규 멤버 */}
        <View
          style={[
            styles.boxShadow,
            {width: widthPercentage2(328)},
            styles.newMemberCard,
          ]}>
          <View style={styles.newMemberCardLabel}>
            <Text style={styles.newMemberCardLabelText}>신규 멤버</Text>
          </View>
          <View style={{marginBottom: 16}}>
            <Text
              style={{
                fontFamily: font.preBold,
                color: '#333333',
                fontSize: 24,
              }}>
              '골프앤라이브러리'에
            </Text>
            <Text
              style={{
                fontFamily: font.preBold,
                color: '#333333',
                fontSize: 24,
              }}>
              신규멤버가 들어왔어요
            </Text>
          </View>
          <Text style={{marginBottom: 40, color: '#767676'}}>
            어떤 멤버인지 확인하기 {' > '}
          </Text>
          <View
            style={{
              flexDirection: 'row-reverse',
            }}>
            <View style={[{width: 160, height: 160}, styles.boxShadow]}>
              <Image
                source={require('../../assets/newmember.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 100,
                }}></Image>
            </View>
            <View style={{justifyContent: 'flex-end', right: 50}}>
              <ImageBackground
                style={{
                  minWidth: 80,
                  minHeight: 50,
                  paddingRight: 32,
                  paddingLeft: 16,
                  paddingTop: 8,
                  paddingBottom: 11,
                  justifyContent: 'center',
                }}
                resizeMode="stretch"
                source={require('../../assets/il_bg_signpost.png')}>
                <Text
                  style={{
                    color: '#505050',
                    fontSize: 14,
                    fontFamily: font.preBold,
                    letterSpacing: 0,
                    textAlign: 'center',
                  }}>
                  전정국이올시다
                </Text>
              </ImageBackground>
            </View>
          </View>
        </View>
        {/* 나와 같은 지역의 모임이에요 */}
        <View
          style={[
            styles.boxShadow,
            {width: widthPercentage2(328)},
            styles.regionCard,
          ]}>
          <View style={styles.regionCardLabel}>
            <Text style={styles.regionCardLabelText}>광주광역시 서구</Text>
          </View>
          <View style={{marginBottom: 16}}>
            <Text style={[styles.regionCardText1, styles.textGray]}>
              나와
              <Text style={[styles.regionCardText2, styles.textGreen]}>
                {' '}
                같은 지역
              </Text>
              의
            </Text>
            <Text style={styles.regionCardText1}>모임이에요</Text>
          </View>
          <Text style={{marginBottom: 40, color: '#767676'}}>
            모임 페이지 구경하기 {' > '}
          </Text>
          <View
            style={{
              width: 160,
              height: 160,
              backgroundColor: '#fafafa',

              ...Platform.select({
                ios: {
                  shadowColor: '#171717',
                  shadowOffset: {width: 0, height: 5},
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                },
                android: {
                  elevation: 10,
                  shadowColor: '#171717',
                },
              }),
              borderRadius: 10,
              alignSelf: 'flex-end',
            }}>
            <Image
              source={require('../../assets/jungmo1.png')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderRadius: 10,
              }}></Image>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: 'rgba(0,0,0,.15)',
                width: '100%',
                borderBottomStartRadius: 10,
                borderBottomEndRadius: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: font.preBold,
                  color: '#fff',
                }}>
                명품트래킹(오이)
              </Text>
            </View>
          </View>
        </View>
        {/* 이런 모임은 어떠세요? */}
        <View
          style={[
            styles.boxShadow,
            {width: widthPercentage2(328)},
            styles.greenCard,
          ]}>
          <View style={styles.greenCardLabel}>
            <Text style={styles.regionCardLabelText}>모임 추천</Text>
          </View>
          <View style={{marginBottom: 16}}>
            <Text style={[styles.regionCardText1, styles.textWhite]}>
              이런 모임은
            </Text>
            <Text style={[styles.regionCardText1, styles.textWhite]}>
              어떠세요?
            </Text>
          </View>
          <Text style={{marginBottom: 40, color: '#ffffff'}}>
            모임 페이지 구경하기 {' > '}
          </Text>
          <View
            style={{
              width: 160,
              height: 160,
              backgroundColor: '#fafafa',

              ...Platform.select({
                ios: {
                  shadowColor: '#171717',
                  shadowOffset: {width: 0, height: 5},
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                },
                android: {
                  elevation: 10,
                  shadowColor: '#171717',
                },
              }),
              borderRadius: 10,
              alignSelf: 'flex-end',
            }}>
            <Image
              source={require('../../assets/maple.png')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderRadius: 10,
              }}></Image>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: 'rgba(0,0,0,.15)',
                width: '100%',
                borderBottomStartRadius: 10,
                borderBottomEndRadius: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: font.preBold,
                  color: '#fff',
                }}>
                쩔해드립니다
              </Text>
            </View>
          </View>
        </View>
        {/* 신규모임 */}
        <View
          style={[
            styles.boxShadow,
            {width: widthPercentage2(328)},
            styles.regionCard,
          ]}>
          <View style={styles.newCardLabel}>
            <Text style={styles.regionCardLabelText}>모임추천</Text>
          </View>
          <View style={{marginBottom: 16}}>
            <Text style={[styles.regionCardText1, styles.textGray]}>
              새로 개설된
            </Text>
            <Text style={[styles.regionCardText2, styles.textPink]}>
              신규모임
              <Text style={[styles.regionCardText1, styles.textGray]}>
                이에요
              </Text>
            </Text>
          </View>
          <Text style={{marginBottom: 40, color: '#767676'}}>
            모임 페이지 구경하기 {' > '}
          </Text>
          <View
            style={{
              width: 160,
              height: 160,
              backgroundColor: '#fafafa',

              ...Platform.select({
                ios: {
                  shadowColor: '#171717',
                  shadowOffset: {width: 0, height: 5},
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                },
                android: {
                  elevation: 10,
                  shadowColor: '#171717',
                },
              }),
              borderRadius: 10,
              alignSelf: 'flex-end',
            }}>
            <Image
              source={require('../../assets/sony.png')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderRadius: 10,
              }}></Image>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: 'rgba(0,0,0,.15)',
                width: '100%',
                borderBottomStartRadius: 10,
                borderBottomEndRadius: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: font.preBold,
                  color: '#fff',
                }}>
                소농민
              </Text>
            </View>
          </View>
        </View>
        {/* 관심사 */}
        <View
          style={[
            styles.boxShadow,
            {width: widthPercentage2(328)},
            styles.regionCard,
          ]}>
          <View style={styles.interestCardLabel}>
            <Text style={styles.regionCardLabelText}>모임 추천</Text>
          </View>
          <View style={{marginBottom: 16}}>
            <Text style={[styles.regionCardText1, styles.textGray]}>
              나와
              <Text style={[styles.regionCardText2, styles.textPurple]}>
                {' '}
                관심사
              </Text>
              가
            </Text>
            <Text style={styles.regionCardText1}>같은 모임이에요</Text>
          </View>
          <Text style={{marginBottom: 40, color: '#767676'}}>
            모임 페이지 구경하기 {' > '}
          </Text>
          <View
            style={{
              width: 160,
              height: 160,
              backgroundColor: '#fafafa',

              ...Platform.select({
                ios: {
                  shadowColor: '#171717',
                  shadowOffset: {width: 0, height: 5},
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                },
                android: {
                  elevation: 10,
                  shadowColor: '#171717',
                },
              }),
              borderRadius: 10,
              alignSelf: 'flex-end',
            }}>
            <Image
              source={require('../../assets/timo.png')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderRadius: 10,
              }}></Image>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: 'rgba(0,0,0,.15)',
                width: '100%',
                borderBottomStartRadius: 10,
                borderBottomEndRadius: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: font.preBold,
                  color: '#fff',
                }}>
                티모티모티모
              </Text>
            </View>
          </View>
        </View>
        {/* 주걱 */}
        <View
          style={[
            styles.boxShadow,
            styles.card,
            {width: widthPercentage2(328)},
          ]}>
          <Image
            style={[styles.img, {height: heightPercentage2(259)}]}
            source={require('../../assets/img_class_ceramics.png')}></Image>

          <View style={[styles.cntBoxMain]}>
            <View style={styles.labelWrapper}>
              <View style={styles.labelClassWrapper}>
                <Text style={styles.labelClassText}>클래스</Text>
              </View>
              <View style={styles.labelRegionWrapper}>
                <Text style={styles.labelRegionText}>광주광역시 광산구</Text>
              </View>
            </View>
            <Text style={styles.classTtl}>
              나만의 감각을 담아 만드는 도자기 주걱
            </Text>
            <View style={styles.classPS}>
              <Text style={styles.classPSText1}>27,000원</Text>
              <View style={styles.classPSInner}>
                <Text style={styles.classPSText2}>20,000원</Text>
                <Text style={styles.classPSText3}>참가 신청하기</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: layout.flex1,
    backgroundColor: 'white',
    paddingBottom: 56,
  },
  topBar: {
    height: 56,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bell: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
    position: 'relative',
    marginRight: 16,
  },
  boxShadow: {
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
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 32,
  },
  img: {
    position: 'relative',
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cntBoxMain: {
    paddingVertical: 28,
    paddingHorizontal: 24,
    // justifyContent: 'flex-end',
  },
  labelWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  labelClassText: {
    color: '#fff',
    fontFamily: font.preReg,
    fontSize: 14,
  },
  labelClassWrapper: {
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#5001f9',
    borderRadius: 4,
  },
  labelSocialText: {
    color: '#fff',
    fontFamily: font.preReg,
    fontSize: 14,
  },
  labelSocialWrapper: {
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#5FBD00',
    borderRadius: 4,
  },
  labelRegionWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
  },
  labelRegionText: {
    color: '#767676',
    fontFamily: font.preReg,
    fontSize: 14,
  },
  classTtl: {
    letterSpacing: -0.5,
    fontFamily: font.preBold,
    fontSize: 24,
    lineHeight: 32,
    color: '#333',
  },
  classPS: {
    marginTop: 32,
  },
  classPSText1: {
    textDecorationLine: 'line-through',
    fontFamily: font.preReg,
    fontSize: 16,
    color: '#767676',
    marginBottom: 8,
  },
  classPSInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  classPSText2: {
    fontSize: 24,
    lineHeight: 24,
    fontFamily: font.preBold,
    color: '#333',
  },
  classPSText3: {
    fontFamily: font.preBold,
    color: '#5001f9',
    fontSize: 16,
  },
  classPSText4: {
    fontFamily: font.preBold,
    color: '#5FBD00',
    fontSize: 16,
  },
  regionCard: {
    borderRadius: 20,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
    alignSelf: 'center',
    marginBottom: 32,
    backgroundColor: '#fafafa',
  },
  greenCard: {
    borderRadius: 20,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
    alignSelf: 'center',
    marginBottom: 32,
    backgroundColor: '#1E3932',
  },
  newMemberCard: {
    borderRadius: 20,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
    alignSelf: 'center',
    backgroundColor: '#FFFB95',
    marginBottom: 32,
  },
  regionCardLabel: {
    alignSelf: 'flex-start',
    backgroundColor: '#06a458',
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  newMemberCardLabel: {
    alignSelf: 'flex-start',
    backgroundColor: '#4F4B00',
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  newMemberCardLabelText: {
    color: '#fff',
    fontFamily: font.preReg,
    fontSize: 12,
    lineHeight: 16,
  },
  greenCardLabel: {
    alignSelf: 'flex-start',
    // backgroundColor: '#06a458',
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  interestCardLabel: {
    alignSelf: 'flex-start',
    backgroundColor: '#A241E8',
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  newCardLabel: {
    alignSelf: 'flex-start',
    backgroundColor: '#DA16DE',
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  regionCardLabelText: {
    color: '#fff',
    fontFamily: font.preReg,
    fontSize: 12,
    lineHeight: 16,
  },
  regionCardText1: {
    fontFamily: font.preBold,
    fontSize: 24,
  },
  regionCardText2: {
    fontFamily: font.preBold,
    fontSize: 24,
  },
  textGray: {
    color: '#505050',
  },
  textGreen: {
    color: '#06a458',
  },
  textPurple: {
    color: '#A241E8',
  },
  textPink: {
    color: '#DA16DE',
  },
  textWhite: {
    color: '#ffffff',
  },
});

export default Home;
