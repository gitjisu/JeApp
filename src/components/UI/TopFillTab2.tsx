import {
  View,
  Animated,
  Pressable,
} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import {font} from '../../styles/globalStyles';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';

type Props = {
  text1: string;
  text2: string;
  handleParentPageByChildIndex: (index: number) => void;
};

export type TopFillTab2Ref = {
  setFillTabPosition: (position: number) => void;
  fillTabPosition: number;
  handlePressLeft: () => void;
  handlePressRight: () => void;
};

const TopFillTab2 = forwardRef<TopFillTab2Ref, Props>((props, ref) => {
  const [fillTabPosition, setFillTabPosition] = useState(0);
  const [fillTabOutPutRange, setFillTabOutPutRange] = useState(0);

  useEffect(() => {
    props.handleParentPageByChildIndex(fillTabPosition);
  }, [fillTabPosition]);

  const handlePressLeft = () => {
    if (fillTabPosition != 0) {
      setFillTabPosition(0);
      handleMoveFillTab();
    }
  };

  const handlePressRight = () => {
    if (fillTabPosition != 1) {
      setFillTabPosition(1);
      handleMoveFillTab();
    }
  };

  const animatedValue = useRef(
    new Animated.Value(fillTabPosition === 0 ? 0 : 1),
  ).current;
  const handleMoveFillTab = () => {
    Animated.timing(animatedValue, {
      toValue: fillTabPosition === 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const interpolateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, fillTabOutPutRange],
  });

  const interpolateText1Color = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#828894'],
  });
  const interpolateText2Color = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#828894', '#ffffff'],
  });
  const swipe = Gesture.Pan()
    .runOnJS(true)
    .onEnd(e => {
      if (e.translationX > 0) {
        handlePressRight();
      } else {
        handlePressLeft();
      }
    });

  useImperativeHandle(
    ref,
    () => ({
      setFillTabPosition: (position: number) => {
        setFillTabPosition(position);
        handleMoveFillTab();
      },
      fillTabPosition,
      handlePressLeft,
      handlePressRight,
    }),
    [setFillTabPosition, handleMoveFillTab, handlePressLeft, handlePressRight],
  );

  return (
    <GestureDetector gesture={swipe}>
      <View
        style={{
          borderRadius: 18,
          height: 68,
          backgroundColor: '#F7F8F9',
          marginHorizontal: 20,
          marginVertical: 20,
          paddingHorizontal: 4,
          paddingVertical: 4,
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
              width: '50%',
              position: 'absolute',
              borderRadius: 18,
              transform: [{translateX: interpolateX}],
            }}></Animated.View>
          <Pressable
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
            onPress={handlePressLeft}>
            <Animated.Text
              style={{
                textAlign: 'center',
                fontFamily: font.preBold,
                fontSize: 18,
                color: interpolateText1Color,
              }}>
              {props.text1}
            </Animated.Text>
          </Pressable>
          <Pressable
            style={{flex: 1, justifyContent: 'center'}}
            onPress={handlePressRight}>
            <Animated.Text
              style={{
                textAlign: 'center',
                fontFamily: font.preBold,
                fontSize: 18,
                color: interpolateText2Color,
              }}>
              {props.text2}
            </Animated.Text>
          </Pressable>
        </View>
      </View>
    </GestureDetector>
  );
});

export default TopFillTab2;
