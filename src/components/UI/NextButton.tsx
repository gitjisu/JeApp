import {View, Text, Pressable, Animated, Platform} from 'react-native';
import React, {useEffect, useState, useRef, forwardRef} from 'react';
import {font} from '../../styles/globalStyles';
import {ios} from '../../styles/iosTheme';

type Props = {
  isNextPossible: Boolean;
  nextButtonText: string;
  handleNextPage: () => void;
  shakeAnimation?: () => void;
};

const NextButton = forwardRef((props: Props, ref) => {
  // background color animation
  const backgroundColorAnim = useRef(
    new Animated.Value(props.isNextPossible ? 1 : 0),
  ).current;
  useEffect(() => {
    Animated.timing(backgroundColorAnim, {
      toValue: props.isNextPossible ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [props.isNextPossible, backgroundColorAnim]);

  const interpolatedColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#beebd4', '#25a765'],
  });

  // text animation
  const [textWidth, setTextWidth] = useState(0);
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
  return (
    <Pressable
      onPress={() => {
        props.isNextPossible
          ? props.handleNextPage()
          : props.shakeAnimation && props.shakeAnimation();
      }}
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}>
      <Animated.View
        style={{
          height: Platform.OS === 'ios' ? 48 + ios.BOTTOM_INDICATOR_HEIGHT : 48,
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
          {props.nextButtonText}
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
          {props.nextButtonText}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
});

export default NextButton;
