import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from './src/navigation/Stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

if (__DEV__) {
  import('./config').then(() => console.log('Reactotron Configured'));
}
const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <SafeAreaProvider>
            <NavigationContainer>
              <StackNav />
            </NavigationContainer>
          </SafeAreaProvider>
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
