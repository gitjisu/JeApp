import Reactotron from 'reactotron-react-native';

import {reactotronRedux} from 'reactotron-redux';

const reactotron = Reactotron.configure() // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from // controls connection & communication settings
  .use(reactotronRedux()) // set Redux(추가)
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

const yeOldeConsoleLog = console.log;
console.log = (...args) => {
  yeOldeConsoleLog(...args);
  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
  });
};
export default reactotron;
