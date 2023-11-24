import {View, Pressable} from 'react-native';
import React from 'react';
import {AppNavigationType} from '../../navigation/StackBase';
type Props = {
  navigation: AppNavigationType;
};

const BackButton = ({navigation}: Props) => {
  return (
    <View style={{paddingHorizontal: 32, paddingTop: 16}}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{width: 25, height: 25}}>
        <View
          style={{width: 25, height: 25, backgroundColor: '#D9D9D9'}}></View>
      </Pressable>
    </View>
  );
};

export default BackButton;
