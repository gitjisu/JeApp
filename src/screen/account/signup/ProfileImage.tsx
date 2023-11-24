import {View, Text, Animated, Pressable, Image, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

//component
import BackButton from '../../../components/UI/BackButton';
import {AppNavigationType} from '../../../navigation/StackBase';
import {ios} from '../../../styles/iosTheme';
import {font} from '../../../styles/globalStyles';

//3rd party
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

//api
import {useAppDispatch} from '../../../store';
import authSlice from '../../../slices/auth';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer';
import etcApiController from '../../../api/controller/etc';

type Props = {
  navigation: AppNavigationType;
};

const ProfileImage = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const nickname = useSelector((state: RootState) => state.auth.nickname);

  const [image, setImage] = useState<string | undefined>(undefined);

  const handleImagePicker = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      res => {
        if (!res.didCancel && res && res.assets) {
          setImage(res.assets[0].uri);
        }
      },
    );
  };

  const handleNextPage = async () => {
    if (image) {
      try {
        const resizedImage = await ImageResizer.createResizedImage(
          image,
          300,
          300,
          'JPEG',
          1,
          undefined,
          undefined,
        );

        const fileName =
          Date.now().toString() + '.' + resizedImage.uri.split('.').pop();
        const form = new FormData();
        form.append('images', {
          uri: resizedImage.uri,
          type: 'image/jpeg',
          name: fileName,
        });
        const url = await etcApiController['123'](form);
        dispatch(authSlice.actions.setProfileImage({profileImage: url}));
      } catch (error) {
        console.log(error);
      }
    }
    navigation.navigate('Interest');
  };
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <BackButton navigation={navigation} />
      <View style={{marginTop: 35, paddingHorizontal: 32}}>
        <Text
          style={{
            fontSize: 20,
            lineHeight: 30,
            fontFamily: font.preReg,
            color: '#000000',
          }}>
          프로필을 설정해보세요
        </Text>
      </View>

      <View
        style={{
          marginTop: 59,
          alignItems: 'center',
        }}>
        <Pressable
          onPress={handleImagePicker}
          style={{
            width: 104,
            height: 104,
            marginBottom: 11,
          }}>
          {image ? (
            <Image
              source={{uri: image}}
              style={{width: '100%', height: '100%', borderRadius: 100}}
            />
          ) : (
            <View
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 100,
                backgroundColor: '#D9D9D9',
              }}></View>
          )}
        </Pressable>
        <Text>{nickname}</Text>
      </View>
      <Pressable
        onPress={handleNextPage}
        style={{
          height: Platform.OS === 'ios' ? 48 + ios.BOTTOM_INDICATOR_HEIGHT : 48,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'center',
          backgroundColor: image ? '#25a765' : '#f2f2f2',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: font.preReg,
            color: image ? '#ffffff' : '#000000',
            fontSize: 14,
            lineHeight: 16.71,
            paddingBottom:
              Platform.OS === 'ios' ? ios.BOTTOM_INDICATOR_HEIGHT : undefined,
          }}>
          {image ? '다음' : '넘어가기'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileImage;
