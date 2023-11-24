import {View, Text, Pressable, Keyboard} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {forwardRef, ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

const KeyboardDismiss = forwardRef((props: Props, ref) => {
  return (
    <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
      {props.children}
    </Pressable>
  );
});

export default KeyboardDismiss;
