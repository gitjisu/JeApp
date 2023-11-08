import {
  View,
  Text,
  StyleSheet,
  Platform,
  Animated,
  Easing,
  NativeSyntheticEvent,
  TextLayoutEventData,
  Image,
  Dimensions,
  ImageLoadEventData,
} from 'react-native';
import React, {
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  ForwardedRef,
  forwardRef,
} from 'react';
import {useWindowDimensions} from 'react-native';
import {
  font,
  widthPercentage2,
  heightPercentage2,
} from '../../../styles/globalStyles';
// 3rd party
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {useSharedValue} from 'react-native-reanimated';

// navigation
import {AppNavigationType, AppRouteProp} from '../../../navigation/StackBase';
import Index from '../../../screen/gathering/Introduce/Index';

type Props = {
  navigation: AppNavigationType;
  refreshComponent: () => void;
};

const cardHeight = 249;
const CAROUSEL_IMAGE = [
  require('../../../assets/timo.png'),
  require('../../../assets/sony.png'),
  require('../../../assets/overwatch.png'),
  require('../../../assets/timo.png'),
  require('../../../assets/sony.png'),
  require('../../../assets/overwatch.png'),
  require('../../../assets/timo.png'),
  require('../../../assets/sony.png'),
  require('../../../assets/overwatch.png'),
  require('../../../assets/timo.png'),
];

const ratio1 = {width: 328, height: 246};
const ratio2 = {width: 328, height: 328};
const ratio3 = {width: 328, height: 410};
let ratio: {width: number; height: number} | null = null;

const Type4 = forwardRef(
  ({navigation, refreshComponent}: Props, ref: ForwardedRef<undefined>) => {
    // console.log('what')
    const onTextLayoutInAndroid = (
      e: NativeSyntheticEvent<TextLayoutEventData>,
    ) => {
      setAllLines(e.nativeEvent.lines.length);
      setIsTruncated(e.nativeEvent.lines.length > numberOfLines);
    };
    const onTextLayoutInIOS = (
      e: NativeSyntheticEvent<TextLayoutEventData>,
    ) => {
      setAllLines(e.nativeEvent.lines.length);
      setIsTruncated(e.nativeEvent.lines.length > numberOfLines);
    };
    const numberOfLines = 2;
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isTruncated, setIsTruncated] = useState<boolean>(false);
    const [allLines, setAllLines] = useState<number>(0);
    const [testH, setTestH] = useState<any>(heightPercentage2(cardHeight));

    const handleExpanded = () => {
      setIsExpanded(!isExpanded);
    };

    let dimensionsH = useWindowDimensions().height;
    let dimensionsW = useWindowDimensions().width;

    useEffect(() => {
      const dimensionsChange = Dimensions.addEventListener('change', status => {
        refreshComponent();
      });
    }, [navigation]);

    const mounted = useRef(false);

    const animatedHeight = useRef(new Animated.Value(testH)).current;
    const [resizeCarouselWidth, setResizeCarouselWidth] = useState<any>(
      widthPercentage2(328),
    );
    const [resizeCarouselHeight, setResizeCarouselHeight] = useState<any>(
      heightPercentage2(328),
    );
    useEffect(() => {
      if (!mounted.current) {
        mounted.current = true;
      } else {
        const h = ((cardHeight + (allLines - 2) * 22) / 800) * 100;
        const newH = dimensionsH * (h / 100);
        Animated.timing(animatedHeight, {
          toValue: newH,
          easing: Easing.inOut(Easing.ease),
          duration: 300, // 애니메이션 지속 시간
          useNativeDriver: false, // 네이티브 드라이버 사용 여부
        }).start();

        setTestH(newH);
      }
    }, [isExpanded]);

    const getImageSize = (e: NativeSyntheticEvent<ImageLoadEventData>) => {
      const {width, height} = e.nativeEvent.source;
      if (width > height) {
        // 4 : 3
        const w = (328 / 360) * 100;
        const newW = dimensionsW * (w / 100);
        const originalRatio = 4 / 3;
        const newH = newW / originalRatio;
        setResizeCarouselWidth(newW);
        setResizeCarouselHeight(newH);
        ratio = ratio1;
      } else if (width === height) {
        // 4 : 4
        const w = (328 / 360) * 100;
        const newW = dimensionsW * (w / 100);
        const originalRatio = 4 / 4;
        const newH = newW / originalRatio;
        setResizeCarouselWidth(newW);
        setResizeCarouselHeight(newH);
        ratio = ratio2;
      } else {
        // 4:5
        const w = (328 / 360) * 100;
        const newW = dimensionsW * (w / 100);
        const originalRatio = 4 / 5;
        const newH = newW / originalRatio;
        setResizeCarouselWidth(newW);
        setResizeCarouselHeight(newH);
        ratio = ratio3;
      }
    };
    const [carouselIndex, setCarouselIndex] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(0);
    const animatedValues = useRef(new Animated.Value(0)).current;
    const dotBoxPosition = new Animated.Value(carouselIndex * -13);
    const intCarouselIndex = new Animated.Value(Math.floor(carouselIndex));
    const animatedBigDot = new Animated.Value(0.8);

    // 1.2 에서 0.8 이 되는데, 그 변화값은 위 식 기준으로 0.5 이상 1 미만이다.
    // 캐러세 인덱스가 0.5에서 1까지는 커지고, 1에서 1.5까지는 다시 작아진다.
    // 현재 케러셀이 1이라면, 1에서 0.5까지는 절대값이 0.1~ 0.2 0.5 가 되고,
    // 1에서 1.5도 0.1~0.2~0.5 가 된다.
    // 이 비율에 맞춰서 스케일 범위가 바뀌면 될듯?
    // 그러면

    useEffect(() => {
      Animated.timing(animatedValues, {
        toValue: 1,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
    }, []);

    useEffect(() => {
      Animated.timing(dotBoxPosition, {
        toValue: -13 * carouselIndex,
        duration: 100,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      }).start();

      Animated.timing(animatedBigDot, {
        toValue: 1.2,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
    });

    return (
      <Animated.View
        ref={ref}
        style={[
          styles.boxShadow,
          styles.card,
          {minHeight: animatedHeight, width: widthPercentage2(328)},
        ]}>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/timo.png')}
            style={{width: 40, height: 40, borderRadius: 100}}></Image>
          <Text
            style={{
              paddingLeft: 8,
              fontFamily: font.preBold,
              fontSize: 15,
              color: '#555',
            }}>
            공속티모
          </Text>
        </View>

        <View style={{paddingHorizontal: 20}}>
          {Platform.OS === 'ios' && (
            <Text
              onTextLayout={onTextLayoutInIOS}
              style={{
                fontFamily: font.preReg,
                fontSize: 15,
                color: '#505050',
                lineHeight: 22,
                opacity: 0,
                position: 'absolute',
              }}>
              {' '}
              응~👌🏻 어쩔티비~ 📺💁🏻‍♂️ 저쩔티비~📺 💁🏻‍♀️
              안물티비~안궁티비~뇌절티비~우짤래미~ 저짤래미~ 쿠쿠루삥뽕🕺🏻 지금
              화났죠?🔥😛 개킹받죠? 죽이고 싶죠? 🤗어차피 내가 사는곳 모르죠?
              응~못 죽이죠?👊🏻🤟🏻 어~또 빡치죠? 😌아무것도 모르죠? 아무것도
              못하죠?😉 그냥 화났죠? 냬~알걨섑니댸👏🏻🙃🙃 아무도 안물 안궁~🤣
              물어본 사람?🙋🏻‍♀️ 궁금한 사람?🙋🏻‍♂️ 응 근데 어쩔티비죠? 약올리죠? 응~
              어쩔 저쩔 안물 안궁😚✌🏻 응~👌🏻 어쩔티비~ 📺💁🏻‍♂️ 저쩔티비~📺 💁🏻‍♀️
              안물티비~안궁티비~뇌절티비~우짤래미~ 저짤래미~ 쿠쿠루삥뽕🕺🏻 지금
              화났죠?🔥😛 개킹받죠?
            </Text>
          )}

          <Text
            ellipsizeMode="clip"
            numberOfLines={isExpanded ? undefined : numberOfLines}
            onTextLayout={
              Platform.OS === 'android' ? onTextLayoutInAndroid : undefined
            }
            style={{
              fontFamily: font.preReg,
              fontSize: 15,
              color: '#505050',
              lineHeight: 22,
            }}>
            응~👌🏻 어쩔티비~ 📺💁🏻‍♂️ 저쩔티비~📺 💁🏻‍♀️
            안물티비~안궁티비~뇌절티비~우짤래미~ 저짤래미~ 쿠쿠루삥뽕🕺🏻 지금
            화났죠?🔥😛 개킹받죠? 죽이고 싶죠? 🤗어차피 내가 사는곳 모르죠?
            응~못 죽이죠?👊🏻🤟🏻 어~또 빡치죠? 😌아무것도 모르죠? 아무것도
            못하죠?😉 그냥 화났죠? 냬~알걨섑니댸👏🏻🙃🙃 아무도 안물 안궁~🤣
            물어본 사람?🙋🏻‍♀️ 궁금한 사람?🙋🏻‍♂️ 응 근데 어쩔티비죠? 약올리죠? 응~ 어쩔
            저쩔 안물 안궁😚✌🏻 응~👌🏻 어쩔티비~ 📺💁🏻‍♂️ 저쩔티비~📺 💁🏻‍♀️
            안물티비~안궁티비~뇌절티비~우짤래미~ 저짤래미~ 쿠쿠루삥뽕🕺🏻 지금
            화났죠?🔥😛 개킹받죠?
          </Text>
          {!isExpanded && isTruncated && (
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0.55, y: 0}}
              colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: 120,
                right: 20,
                position: 'absolute',
                top: 22,
                height: 22,
              }}>
              <Text
                onPress={handleExpanded}
                style={{
                  fontFamily: font.preBold,
                  fontSize: 15,
                  color: '#505050',
                  lineHeight: 22,
                }}>
                {'  '}...더보기
              </Text>
            </LinearGradient>
          )}
        </View>
        <Carousel
          loop={false}
          width={resizeCarouselWidth}
          height={resizeCarouselHeight}
          style={{marginTop: 16}}
          data={[...CAROUSEL_IMAGE]}
          onProgressChange={(_, absoluteProgress) => {
            setCarouselIndex(absoluteProgress);
          }}
          renderItem={({index}) => (
            <View>
              <Image
                onLoad={index === 0 ? getImageSize : undefined}
                source={CAROUSEL_IMAGE[index]}
                resizeMode="cover"
                style={{width: '100%', height: '100%'}}></Image>
            </View>
          )}></Carousel>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={{flex: 1}}></View>
          <Animated.View
            key={carouselIndex}
            style={[
              {
                transform: [{translateX: dotBoxPosition}],
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                right: 10,
                // borderWidth: 1,
              },
            ]}>
            {CAROUSEL_IMAGE.map((_, index) => {
              if (index - 0.5 < carouselIndex && carouselIndex < index + 0.5) {
                return (
                  <>
                    {/* <Text>{carouselIndex}</Text> */}
                    <Animated.View
                      key={index}
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: '#333',
                        marginLeft: 5,
                        borderRadius: 100,
                        transform: [{scale: 1.2}],
                      }}></Animated.View>
                  </>
                );
              } else {
                if (
                  Math.abs(index - carouselIndex) > 0.5 &&
                  Math.abs(index - carouselIndex) < 1.5
                ) {
                  return (
                    <>
                      <View
                        key={index}
                        style={{
                          width: 8,
                          height: 8,
                          backgroundColor: '#e5e5ec',
                          marginLeft: 5,
                          borderRadius: 100,
                          transform: [{scale: 0.8}],
                        }}></View>
                    </>
                  );
                } else if (
                  Math.abs(index - carouselIndex) > 1.5 &&
                  Math.abs(index - carouselIndex) < 2.5
                ) {
                  return (
                    <>
                      <View
                        key={index}
                        style={{
                          width: 8,
                          height: 8,
                          backgroundColor: '#e5e5ec',
                          marginLeft: 5,
                          borderRadius: 100,
                          transform: [{scale: 0.5}],
                        }}></View>
                    </>
                  );
                }
                return (
                  <>
                    <View
                      key={index}
                      style={{
                        transform: [{scale: 0}],
                        width: 8,
                        height: 8,
                        backgroundColor: '#e5e5ec',
                        marginLeft: 5,
                        borderRadius: 100,
                      }}></View>
                  </>
                );
              }
            })}
          </Animated.View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 8,
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/heartOn.png')}
                style={{width: 29, height: 29}}
              />

              <Text
                style={{
                  fontFamily: font.preReg,
                  fontSize: 14,
                  letterSpacing: 0.7,
                  marginLeft: 4,
                }}>
                2
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 8,
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/comment.png')}
                style={{width: 29, height: 29}}
              />

              <Text
                style={{
                  fontFamily: font.preReg,
                  fontSize: 14,
                  letterSpacing: 0.7,
                  marginLeft: 4,
                }}>
                2
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 8,
                alignItems: 'center',
                position: 'absolute',
                right: 0,
              }}>
              <Image
                source={require('../../../assets/eyes.png')}
                style={{width: 24, height: 24}}
              />
              <Text
                style={{
                  fontFamily: font.preReg,
                  fontSize: 14,
                  letterSpacing: 0.7,
                  color: '#767676',
                }}>
                8465
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
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
    width: '100%',
  },
  animatedDots: {
    width: 8,
    height: 8,

    marginLeft: 5,
    borderRadius: 100,
  },
});

export default Type4;
