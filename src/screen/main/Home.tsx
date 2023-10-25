import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import {
  font,
  layout,
  widthPercentage2,
  heightPercentage2,
} from '../../styles/globalStyles';
import {Shadow} from 'react-native-shadow-2';
import {ios} from '../../styles/iosTheme';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase, 'VideoScreen'>;
};

const Home = ({navigation}: Props) => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* 알림 */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Image
            style={styles.bell}
            source={require('../../assets/bell.png')}></Image>
        </View>

        <View
          style={[
            styles.boxShadow,
            styles.card,
            {height: heightPercentage2(466), width: widthPercentage2(328)},
          ]}>
          <View>
            <Image
              style={[styles.img, {height: heightPercentage2(259)}]}
              source={require('../../assets/img_class_moju_.png')}></Image>
          </View>
          <View>
            <Text>하잉</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: layout.flex1,
    backgroundColor: 'white',
    paddingBottom: 56,
  },
  topBar: {
    height: 56,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bell: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
    position: 'relative',
    marginRight: 16,
  },
  boxShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
        shadowColor: '#171717',
      },
    }),
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 32,
  },
  img: {
    position: 'relative',
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default Home;
