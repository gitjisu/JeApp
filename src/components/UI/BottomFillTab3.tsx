import {View, Animated, Pressable} from 'react-native';
import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {font} from '../../styles/globalStyles';

type Props = {
  text1: string;
  text2: string;
  text3: string;
  handleParentPageByChildIndex: (index: number) => void;
};

export type BottomFillTab3Ref = {
  setFillTabPosition: (position: number) => void;
  fillTabPosition: number;
  handlePressLeft: () => void;
  handlePressRight: () => void;
  handlePressCenter: () => void;
};

const BottomFillTab3 = forwardRef<BottomFillTab3Ref, Props>((props, ref) => {
  const [fillTabPosition, setFillTabPosition] = useState(0);
  const [fillTabOutPutRange, setFillTabOutPutRange] = useState(0);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const mounted = useRef(false);
  const handlePressRight = () => {
    setFillTabPosition(2);
    if (fillTabPosition === 1) {
      animatedValue.setValue(fillTabOutPutRange);
      Animated.timing(animatedValue, {
        toValue: fillTabOutPutRange * 2,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else if (fillTabPosition === 0) {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: fillTabOutPutRange * 2,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handlePressLeft = () => {
    setFillTabPosition(0);
    if (fillTabPosition === 1) {
      animatedValue.setValue(fillTabOutPutRange);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else if (fillTabPosition === 2) {
      animatedValue.setValue(fillTabOutPutRange * 2);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };
  const handlePressCenter = () => {
    setFillTabPosition(1);
    if (fillTabPosition === 0) {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: fillTabOutPutRange,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else if (fillTabPosition === 2) {
      animatedValue.setValue(fillTabOutPutRange * 2);
      Animated.timing(animatedValue, {
        toValue: fillTabOutPutRange,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const swipe = Gesture.Pan()
    .runOnJS(true)
    .onEnd(e => {
      if (e.translationX > 0) {
        if (fillTabPosition === 0) {
          setFillTabPosition(1);
          animatedValue.setValue(0);
          Animated.timing(animatedValue, {
            toValue: fillTabOutPutRange,
            duration: 200,
            useNativeDriver: false,
          }).start();
        } else if (fillTabPosition === 1) {
          setFillTabPosition(2);
          animatedValue.setValue(fillTabOutPutRange);
          Animated.timing(animatedValue, {
            toValue: fillTabOutPutRange * 2,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      } else {
        if (fillTabPosition === 2) {
          setFillTabPosition(1);
          animatedValue.setValue(fillTabOutPutRange * 2);
          Animated.timing(animatedValue, {
            toValue: fillTabOutPutRange,
            duration: 200,
            useNativeDriver: false,
          }).start();
        } else if (fillTabPosition === 1) {
          setFillTabPosition(0);
          animatedValue.setValue(fillTabOutPutRange);
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      }
    });

  const text1AnimatedValue = useRef(new Animated.Value(0)).current;
  const text2AnimatedValue = useRef(new Animated.Value(0)).current;
  const text3AnimatedValue = useRef(new Animated.Value(0)).current;
  const interpolateText1 = text1AnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#828894', '#ffffff'],
  });
  const interpolateText2 = text2AnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#828894', '#ffffff'],
  });
  const interpolateText3 = text3AnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#828894', '#ffffff'],
  });

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      text1AnimatedValue.setValue(1);
    } else {
      props.handleParentPageByChildIndex(fillTabPosition);
      if (fillTabPosition === 0) {
        text2AnimatedValue.setValue(0);
        text3AnimatedValue.setValue(0);
        Animated.timing(text1AnimatedValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }).start();
      } else if (fillTabPosition === 1) {
        text1AnimatedValue.setValue(0);
        text3AnimatedValue.setValue(0);
        Animated.timing(text2AnimatedValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }).start();
      } else if (fillTabPosition === 2) {
        text1AnimatedValue.setValue(0);
        text2AnimatedValue.setValue(0);
        Animated.timing(text3AnimatedValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    }
  }, [fillTabPosition]);

  useImperativeHandle(
    ref,
    () => ({
      setFillTabPosition: (position: number) => {
        setFillTabPosition(position);
      },
      fillTabPosition,
      handlePressCenter,
      handlePressLeft,
      handlePressRight,
    }),
    [setFillTabPosition, handlePressCenter, handlePressLeft, handlePressRight],
  );

  return (
    <GestureDetector gesture={swipe}>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 18,
          marginHorizontal: 20,
          marginVertical: 20,
          height: 68,
          backgroundColor: '#F7F8F9',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <Animated.View
            onLayout={event => {
              setFillTabOutPutRange(event.nativeEvent.layout.width);
            }}
            style={{
              backgroundColor: '#26BD71',
              height: '100%',
              width: '33.3333%',
              position: 'absolute',
              borderRadius: 18,
              transform: [{translateX: animatedValue}],
            }}></Animated.View>
          <Pressable
            onPress={handlePressLeft}
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Animated.Text
              style={{
                textAlign: 'center',
                fontFamily: font.preBold,
                fontSize: 18,
                color: interpolateText1,
              }}>
              {props.text1}
            </Animated.Text>
          </Pressable>
          <Pressable
            onPress={handlePressCenter}
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Animated.Text
              style={{
                textAlign: 'center',
                fontFamily: font.preBold,
                fontSize: 18,
                color: interpolateText2,
              }}>
              {props.text2}
            </Animated.Text>
          </Pressable>
          <Pressable
            onPress={handlePressRight}
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Animated.Text
              style={{
                textAlign: 'center',
                fontFamily: font.preBold,
                fontSize: 18,
                color: interpolateText3,
              }}>
              {props.text3}
            </Animated.Text>
          </Pressable>
        </View>
      </View>
    </GestureDetector>
  );
});

export default BottomFillTab3;
