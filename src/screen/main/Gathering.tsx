import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
interface Props {
  navigation: NativeStackNavigationProp<ParamListBase, 'Gathering'>;
}

const Gathering = ({navigation}: Props) => {
  const goToGatheringIndex = () => {
    navigation.navigate('GatheringIndex');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Gathering</Text>
      <Pressable onPress={goToGatheringIndex}>
        <Text>모임페이지 가즈아</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Gathering;
