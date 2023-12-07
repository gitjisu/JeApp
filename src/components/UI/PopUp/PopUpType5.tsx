import {
  View,
  Text,
  Pressable,
  Easing,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import React, {forwardRef, useEffect, useState} from 'react';

import ReactNativeModal from 'react-native-modal';
import {font} from '../../../styles/globalStyles';
import DismissKeyboardView from '../DismissKeyboardView';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
type Props = {
  isVisible: boolean;
  setPopup5Visible: (boolean: boolean) => void;
  titleText: string;
  descriptionText: string;
  okText: string;
  cancelText: string;
};

export type PopUpType5Ref = {};

const PopUpType5 = forwardRef<PopUpType5Ref, Props>((props, ref) => {
  const [input, setInput] = useState<string>('');
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  useEffect(() => {
    // 키보드가 나타날 때의 이벤트 리스너
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );

    // 키보드가 사라질 때의 이벤트 리스너
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0); // 키보드가 사라질 때는 높이를 0으로 설정
      },
    );

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <ReactNativeModal
      backdropColor="rgba(0,0,0,0.3)"
      isVisible={props.isVisible}
      animationIn={{
        from: {opacity: 0, transform: [{translateY: +10}]},
        to: {opacity: 1, transform: [{translateY: 0}]},
        easing: Easing.out(Easing.quad),
      }}
      animationOut={{
        from: {opacity: 1, transform: [{translateY: 0}]},
        to: {opacity: 0, transform: [{translateY: +10}]},
        easing: Easing.out(Easing.quad),
      }}
      style={{
        margin: 16,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: Platform.OS === 'ios' ? keyboardHeight : 0,
        }}>
        <View
          style={{
            borderRadius: 16,
            backgroundColor: '#ffffff',
            width: '100%',
            paddingTop: 32,
            paddingBottom: 20,
            paddingHorizontal: 16,
          }}>
          <View
            style={{
              paddingBottom: 24,
            }}>
            <Text
              style={{
                fontFamily: font.preBold,
                fontSize: 17,
                lineHeight: 25,
                textAlign: 'center',
                paddingBottom: 8,
                color: '#31353D',
              }}>
              {props.titleText}
            </Text>
            <Text
              style={{
                fontFamily: font.preReg,
                fontSize: 15,
                lineHeight: 22,
                textAlign: 'center',
                color: '#5E6570',
              }}>
              {props.descriptionText}
            </Text>
          </View>
          <View
            style={{
              marginBottom: 16,
            }}>
            <TextInput
              placeholder="내용을 입력해주세요"
              keyboardType="default"
              value={input}
              onChangeText={setInput}
              style={{
                paddingHorizontal: 20,
                height: 60,
                borderRadius: 16,
                backgroundColor: 'rgba(245,247,250,1)',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Pressable
              onPress={() => {
                props.setPopup5Visible(!props.isVisible);
                setInput('');
              }}
              style={{
                flex: 1,
                marginRight: 4,
                backgroundColor: 'rgba(247, 248, 249, 1)',

                paddingVertical: 17.5,
                borderRadius: 13,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'rgba(130, 136, 148, 1)',
                  fontFamily: font.preReg,
                  fontSize: 17,
                  lineHeight: 17,
                }}>
                {props.cancelText}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                props.setPopup5Visible(!props.isVisible);
                setInput('');
              }}
              style={{
                flex: 1,
                marginLeft: 4,
                backgroundColor: '#26BD71',
                paddingVertical: 17.5,
                borderRadius: 13,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#ffffff',
                  fontFamily: font.preReg,
                  fontSize: 17,
                  lineHeight: 17,
                }}>
                {props.okText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
});

export default PopUpType5;
