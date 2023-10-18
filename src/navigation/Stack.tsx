import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Image, Animated} from 'react-native';
import {ios} from '../styles/iosTheme';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//NAV
import Chat from '../screen/main/Chat';
import Gathering from '../screen/main/Gathering';
import Home from '../screen/main/Home';
import My from '../screen/main/My';
import MyGathering from '../screen/main/MyGathering';

// Gathering Screen
import GatheringIndex from '../screen/gathering/Introduce/Index';

// store
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';

// none login
import VideoScreen from '../screen/account/login/VideoScreen';

const TabNav = () => {
  return (
    <Tab.Navigator
      backBehavior="none"
      initialRouteName="Home"
      screenOptions={{headerShown: false, tabBarStyle: styles.tabBar}}>
      <Tab.Screen
        name="Gathering"
        component={Gathering}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({focused}) => {
            // 이미지 크기에 따라 Animated.Value 설정
            const translateY = new Animated.Value(0);
            if (focused) {
              Animated.sequence([
                Animated.timing(translateY, {
                  toValue: -10, // 위로 튀는 애니메이션
                  duration: 150, // 애니메이션 지속 시간 (ms)
                  useNativeDriver: false, // 네이티브 드라이버 사용 여부
                }),
                Animated.timing(translateY, {
                  toValue: 0, // 다시 아래로 튀는 애니메이션
                  duration: 150, // 애니메이션 지속 시간 (ms)
                  useNativeDriver: false, // 네이티브 드라이버 사용 여부
                }),
              ]).start();
            }
            return (
              <View style={styles.tabIconContainer}>
                <Animated.View
                  style={{
                    transform: [{translateY}],
                  }}>
                  <Image
                    source={
                      focused
                        ? require('../assets/gatheringIn.png')
                        : require('../assets/gatheringOut.png')
                    }
                    resizeMode="contain"
                    style={styles.tabIcon}
                  />
                </Animated.View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="MyGathering"
        component={MyGathering}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({focused}) => {
            // 이미지 크기에 따라 Animated.Value 설정
            const translateY = new Animated.Value(0);
            if (focused) {
              Animated.sequence([
                Animated.timing(translateY, {
                  toValue: -10, // 위로 튀는 애니메이션
                  duration: 150, // 애니메이션 지속 시간 (ms)
                  useNativeDriver: false, // 네이티브 드라이버 사용 여부
                }),
                Animated.timing(translateY, {
                  toValue: 0, // 다시 아래로 튀는 애니메이션
                  duration: 150, // 애니메이션 지속 시간 (ms)
                  useNativeDriver: false, // 네이티브 드라이버 사용 여부
                }),
              ]).start();
            }
            return (
              <View style={styles.tabIconContainer}>
                <Animated.View
                  style={{
                    transform: [{translateY}],
                  }}>
                  <Image
                    source={
                      focused
                        ? require('../assets/myGatheringIn.png')
                        : require('../assets/myGatheringOut.png')
                    }
                    resizeMode="contain"
                    style={styles.tabIcon}
                  />
                </Animated.View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({focused}) => {
            // 이미지 크기에 따라 Animated.Value 설정
            const translateY = new Animated.Value(0);
            if (focused) {
              Animated.sequence([
                Animated.timing(translateY, {
                  toValue: -10, // 위로 튀는 애니메이션
                  duration: 150, // 애니메이션 지속 시간 (ms)
                  useNativeDriver: false, // 네이티브 드라이버 사용 여부
                }),
                Animated.timing(translateY, {
                  toValue: 0, // 다시 아래로 튀는 애니메이션
                  duration: 150, // 애니메이션 지속 시간 (ms)
                  useNativeDriver: false, // 네이티브 드라이버 사용 여부
                }),
              ]).start();
            }
            return (
              <View style={styles.tabIconContainer}>
                <Animated.View
                  style={{
                    transform: [{translateY}],
                  }}>
                  <Image
                    source={
                      focused
                        ? require('../assets/homeIn.png')
                        : require('../assets/homeOut.png')
                    }
                    resizeMode="contain"
                    style={styles.tabIcon}
                  />
                </Animated.View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({focused}) => {
            // 이미지 크기에 따라 Animated.Value 설정
            const translateY = new Animated.Value(0);
            if (focused) {
              Animated.sequence([
                Animated.timing(translateY, {
                  toValue: -10, // 위로 튀는 애니메이션
                  duration: 150, // 애니메이션 지속 시간 (ms)
                  useNativeDriver: false, // 네이티브 드라이버 사용 여부
                }),
                Animated.timing(translateY, {
                  toValue: 0, // 다시 아래로 튀는 애니메이션
                  duration: 150, // 애니메이션 지속 시간 (ms)
                  useNativeDriver: false, // 네이티브 드라이버 사용 여부
                }),
              ]).start();
            }
            return (
              <View style={styles.tabIconContainer}>
                <Animated.View
                  style={{
                    transform: [{translateY}],
                  }}>
                  <Image
                    source={
                      focused
                        ? require('../assets/chatIn.png')
                        : require('../assets/chatOut.png')
                    }
                    resizeMode="contain"
                    style={styles.tabIcon}
                  />
                </Animated.View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="My"
        component={My}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({focused}) => {
            // 이미지 크기에 따라 Animated.Value 설정
            const translateY = new Animated.Value(0);
            if (focused) {
              Animated.sequence([
                Animated.timing(translateY, {
                  toValue: -10, // 위로 튀는 애니메이션
                  duration: 150, // 애니메이션 지속 시간 (ms)
                  useNativeDriver: false, // 네이티브 드라이버 사용 여부
                }),
                Animated.timing(translateY, {
                  toValue: 0, // 다시 아래로 튀는 애니메이션
                  duration: 150, // 애니메이션 지속 시간 (ms)
                  useNativeDriver: false, // 네이티브 드라이버 사용 여부
                }),
              ]).start();
            }
            return (
              <View style={styles.tabIconContainer}>
                <Animated.View
                  style={{
                    transform: [{translateY}],
                  }}>
                  <Image
                    source={
                      focused
                        ? require('../assets/myIn.png')
                        : require('../assets/myOut.png')
                    }
                    resizeMode="contain"
                    style={styles.tabIcon}
                  />
                </Animated.View>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const StackNav = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  return isLoggedIn ? (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="TabNav" component={TabNav} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="GatheringIndex" component={GatheringIndex} />
      </Stack.Group>
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="VideoScreen"
          component={VideoScreen}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    padding: 0,
    // left: 16,
    // right: 16,
    // bottom: 32,
    // bottom: Platform.OS === 'ios' ? ios.BOTTOM_INDICATOR_HEIGHT : 0,
    height: Platform.OS === 'ios' ? 56 + ios.BOTTOM_INDICATOR_HEIGHT : 56,
    // borderRadius: 16,
    backgroundColor: 'white',
    borderTopColor: 'transparent',
    shadowColor: 'gray',
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabIconContainer: {
    position: 'absolute',
    top: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 32,
    height: 32,
  },
});

export default StackNav;
