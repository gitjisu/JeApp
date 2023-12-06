import {View, Text, Pressable, Easing} from 'react-native';
import React, {forwardRef, useMemo, useRef} from 'react';

import ReactNativeModal from 'react-native-modal';
import {font} from '../../../styles/globalStyles';

type Props = {
  isVisible: boolean;
  setPopup1Visible: (boolean: boolean) => void;
};

export type PopUpType1Ref = {};

const PopUpType1 = forwardRef<PopUpType1Ref, Props>((props, ref) => {
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
              팝업이라고 부르겠습니다
            </Text>
            <Text
              style={{
                fontFamily: font.preReg,
                fontSize: 15,
                lineHeight: 22,
                textAlign: 'center',
                color: '#5E6570',
              }}>
              작업에 대한 내용을 확인시키거나 {'\n'}정보의 입력, 승인을
              요구합니다
            </Text>
          </View>
          <Pressable
            onPress={() => props.setPopup1Visible(!props.isVisible)}
            style={{
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
              네, 좋아요!
            </Text>
          </Pressable>
        </View>
      </View>
    </ReactNativeModal>
  );
});

export default PopUpType1;
