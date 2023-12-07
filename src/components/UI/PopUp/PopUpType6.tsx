import {
  View,
  Text,
  Pressable,
  Easing,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React, {forwardRef, useMemo, useRef} from 'react';

import ReactNativeModal from 'react-native-modal';
import {font} from '../../../styles/globalStyles';

type Props = {
  isVisible: boolean;
  setPopup6Visible: (boolean: boolean) => void;
  titleText: string;
  descriptionText: string;
  okText: string;
  cancelText: string;
  img1: ImageSourcePropType;
  img2: ImageSourcePropType;
};

export type PopUpType6Ref = {};

const PopUpType6 = forwardRef<PopUpType6Ref, Props>((props, ref) => {
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
                paddingBottom: 12,
                color: '#31353D',
              }}>
              {props.titleText}
            </Text>
            <View
              style={{
                justifyContent: 'center',
                marginBottom: 12,
                flexDirection: 'row',
              }}>
              <Image
                source={props.img1}
                style={{
                  width: 80,
                  height: 80,
                  marginRight: 10,
                }}
              />
              <Image
                source={props.img2}
                style={{
                  width: 80,
                  height: 80,
                  marginLeft: 10,
                }}
              />
            </View>
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
              flexDirection: 'row',
            }}>
            <Pressable
              onPress={() => props.setPopup6Visible(!props.isVisible)}
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
              onPress={() => props.setPopup6Visible(!props.isVisible)}
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

export default PopUpType6;
