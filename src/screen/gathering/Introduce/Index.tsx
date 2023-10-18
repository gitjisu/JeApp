import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Animated} from 'react-native';
const Index = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={{backgroundColor: 'black', height: 3000, color: 'white'}}>
          Index
        </Text>
        <Text style={{backgroundColor: 'orange', height: 3000, color: 'white'}}>
          Index
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
