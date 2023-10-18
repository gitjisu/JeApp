import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={{backgroundColor: 'black', height: 3000, color: 'white'}}>
          Home
        </Text>
        <Text style={{backgroundColor: 'purple', height: 3000, color: 'white'}}>
          Home
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
