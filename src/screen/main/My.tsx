import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import {useAppDispatch} from '../../store';
import userSlice from '../../slices/user';
import {useRoute} from '@react-navigation/native';
import uiSlice from '../../slices/ui';
import {SafeAreaView} from 'react-native-safe-area-context';

const My = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const setLogginState = () => {
    dispatch(
      userSlice.actions.setIsLoggedIn({
        isLoggedIn: true,
      }),
    );
  };
  return (
    <SafeAreaView>
      <View>
        <Text></Text>
      </View>
    </SafeAreaView>
  );
};

export default My;
