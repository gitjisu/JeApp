import {View, Text, Pressable, Keyboard, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {font} from '../../styles/globalStyles';

import PopUpType1 from '../../components/UI/PopUp/PopUpType1';
import PopUpType2 from '../../components/UI/PopUp/PopUpType2';
import PopUpType3 from '../../components/UI/PopUp/PopUpType3';
import PopUpType4 from '../../components/UI/PopUp/PopUpType4';
import PopUpType5 from '../../components/UI/PopUp/PopUpType5';
import PopUpType6 from '../../components/UI/PopUp/PopUpType6';

const PopUpPage = () => {
  const [popup1Visible, setPopup1Visible] = useState(false);
  const [popup2Visible, setPopup2Visible] = useState(false);
  const [popup3Visible, setPopup3Visible] = useState(false);
  const [popup4Visible, setPopup4Visible] = useState(false);
  const [popup5Visible, setPopup5Visible] = useState(false);
  const [popup6Visible, setPopup6Visible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useEffect(() => {
    // 키보드가 나타날 때의 이벤트 리스너
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );

    // 키보드가 사라질 때의 이벤트 리스너
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0); // 키보드가 사라질 때는 높이를 0으로 설정
      },
    );

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'red',
        paddingBottom: Platform.OS === 'ios' ? keyboardHeight : 0,
      }}>
      <PopUpType1
        isVisible={popup1Visible}
        setPopup1Visible={setPopup1Visible}
        titleText="타입1 팝업이라고 부르겠습니다"
        descriptionText={`작업에 대한 내용을 확인시키거나\n정보의 입력, 승인을 요구합니다.`}
        okText="네, 좋아요!"
      />
      <PopUpType2
        isVisible={popup2Visible}
        setPopup2Visible={setPopup2Visible}
        titleText="타입2 팝업이라고 부르겠습니다"
        descriptionText={`작업에 대한 내용을 확인시키거나\n정보의 입력, 승인을 요구합니다.`}
        okText="네, 좋아요!"
        cancelText="닫기"
      />
      <PopUpType3
        isVisible={popup3Visible}
        setPopup3Visible={setPopup3Visible}
        titleText="타입3 팝업이라고 부르겠습니다"
        descriptionText={`작업에 대한 내용을 확인시키거나\n정보의 입력, 승인을 요구합니다.`}
        okText="문의하기"
        cancelText="닫기"
      />
      <PopUpType4
        isVisible={popup4Visible}
        setPopup4Visible={setPopup4Visible}
        titleText="타입4 팝업이라고 부르겠습니다"
        descriptionText={`작업에 대한 내용을 확인시키거나\n정보의 입력, 승인을 요구합니다.`}
        okText="문의하기"
        cancelText="닫기"
        img={require('../../assets/5097.png')}
      />
      <PopUpType5
        isVisible={popup5Visible}
        setPopup5Visible={setPopup5Visible}
        titleText="타입5 팝업이라고 부르겠습니다"
        descriptionText={`작업에 대한 내용을 확인시키거나\n정보의 입력, 승인을 요구합니다.`}
        okText="완료"
        cancelText="닫기"
      />
      <PopUpType6
        isVisible={popup6Visible}
        setPopup6Visible={setPopup6Visible}
        titleText="타입6 팝업이라고 부르겠습니다"
        descriptionText={`작업에 대한 내용을 확인시키거나\n정보의 입력, 승인을 요구합니다.`}
        okText="문의하기"
        cancelText="닫기"
        img1={require('../../assets/5097.png')}
        img2={require('../../assets/5096.png')}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        {/* type1 */}
        <Pressable
          onPress={() => {
            setPopup1Visible(prev => !prev);
          }}
          style={{
            margin: 10,
            borderRadius: 10,
            backgroundColor: '#26BD71',
            width: '50%',
            alignSelf: 'center',
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontFamily: font.preBold,
              textAlign: 'center',
              fontSize: 18,
            }}>
            팝업 type 1
          </Text>
        </Pressable>
        {/* type2 */}
        <Pressable
          onPress={() => {
            setPopup2Visible(prev => !prev);
          }}
          style={{
            margin: 10,
            borderRadius: 10,
            backgroundColor: '#26BD71',
            width: '50%',
            alignSelf: 'center',
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontFamily: font.preBold,
              textAlign: 'center',
              fontSize: 18,
            }}>
            팝업 type 2
          </Text>
        </Pressable>
        {/* type3 */}
        <Pressable
          onPress={() => {
            setPopup3Visible(prev => !prev);
          }}
          style={{
            margin: 10,
            borderRadius: 10,
            backgroundColor: '#26BD71',
            width: '50%',
            alignSelf: 'center',
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontFamily: font.preBold,
              textAlign: 'center',
              fontSize: 18,
            }}>
            팝업 type 3
          </Text>
        </Pressable>
        {/* type4 */}
        <Pressable
          onPress={() => {
            setPopup4Visible(prev => !prev);
          }}
          style={{
            margin: 10,
            borderRadius: 10,
            backgroundColor: '#26BD71',
            width: '50%',
            alignSelf: 'center',
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontFamily: font.preBold,
              textAlign: 'center',
              fontSize: 18,
            }}>
            팝업 type 4
          </Text>
        </Pressable>
        {/* type5 */}
        <Pressable
          onPress={() => {
            setPopup5Visible(prev => !prev);
          }}
          style={{
            margin: 10,
            borderRadius: 10,
            backgroundColor: '#26BD71',
            width: '50%',
            alignSelf: 'center',
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontFamily: font.preBold,
              textAlign: 'center',
              fontSize: 18,
            }}>
            팝업 type 5
          </Text>
        </Pressable>
        {/* type6 */}
        <Pressable
          onPress={() => {
            setPopup6Visible(prev => !prev);
          }}
          style={{
            margin: 10,
            borderRadius: 10,
            backgroundColor: '#26BD71',
            width: '50%',
            alignSelf: 'center',
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontFamily: font.preBold,
              textAlign: 'center',
              fontSize: 18,
            }}>
            팝업 type 6
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default PopUpPage;
