import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
//components
import BackButton from '../../../components/UI/BackButton';
import {AppNavigationType} from '../../../navigation/StackBase';
import {ios} from '../../../styles/iosTheme';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer';
import {font} from '../../../styles/globalStyles';

type Props = {
  navigation: AppNavigationType;
};

const SignupComplete = ({navigation}: Props) => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            width: '100%',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: -64,
          }}>
          <Text
            style={{
              fontFamily: font.preReg,
              fontSize: 20,
              lineHeight: 25,
              textAlign: 'center',
              marginBottom: 20,
            }}>
            회원이 되신걸 축하해요!{'\n'}즐거운 취미모임을 응원할게요!
          </Text>
          {user?.img ? (
            <Image
              source={{uri: user?.img}}
              style={{width: 128, height: 128, borderRadius: 100}}
            />
          ) : (
            <View
              style={{
                width: 128,
                height: 128,
                borderRadius: 100,
                backgroundColor: '#d9d9d9',
              }}></View>
          )}
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}></View>
      <Pressable
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={{
          height: Platform.OS === 'ios' ? 48 + ios.BOTTOM_INDICATOR_HEIGHT : 48,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'center',
          backgroundColor: '#25a765',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: font.preReg,
            color: '#ffffff',
            fontSize: 14,
            lineHeight: 16.71,
            paddingBottom:
              Platform.OS === 'ios' ? ios.BOTTOM_INDICATOR_HEIGHT : undefined,
          }}>
          다음
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SignupComplete;
