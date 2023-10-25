import React, {useCallback, useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from './src/navigation/Stack';
import {useWindowDimensions, Dimensions} from 'react-native';
export const percentageCalculation = (max: number, val: number) =>
  max * (val / 100);

export const useResponsiveScreenWidth = (w: number) => {
  const {width} = useWindowDimensions();
  return percentageCalculation(width, w);
};

export const useResponsiveScreenHeight = (h: number) => {
  const {height} = useWindowDimensions();
  return percentageCalculation(height, h);
};
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackNav />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
