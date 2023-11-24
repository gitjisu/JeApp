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
const CAROUSEL_IMAGE3 = [
  require('../../../assets/overwatch.png'),
  require('../../../assets/sony.png'),
  require('../../../assets/square.png'),
];

const ratio1 = {width: 328, height: 246};
const ratio2 = {width: 328, height: 328};
const ratio3 = {width: 328, height: 410};
let ratio: {width: number; height: number} | null = null;

const Type6 = forwardRef(
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
    const progressValue = useSharedValue<number>(0);

    const animatedValues = new Animated.Value(0);

    useEffect(() => {
      Animated.timing(animatedValues, {
        toValue: 1,
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
            타입6
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
              ㅋ
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
            ㅋ
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
          data={[...CAROUSEL_IMAGE3]}
          onSnapToItem={index => {
            setCarouselIndex(index);
          }}
          renderItem={({index}) => (
            <View>
              <Image
                onLoad={index === 0 ? getImageSize : undefined}
                source={CAROUSEL_IMAGE3[index]}
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
          {CAROUSEL_IMAGE3.map((_, index) => {
            if (index === carouselIndex) {
              return (
                <>
                  <Animated.View
                    key={index}
                    style={[
                      styles.animatedDots,
                      {
                        backgroundColor: animatedValues.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['#e5e5ec', '#333'],
                        }),
                      },
                    ]}></Animated.View>
                </>
              );
            } else {
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
                    }}></View>
                </>
              );
            }
          })}
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

export default Type6;
