import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from './src/navigation/Stack';
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
