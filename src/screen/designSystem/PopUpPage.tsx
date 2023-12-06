import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {font} from '../../styles/globalStyles';

import PopUpType1, {PopUpType1Ref} from '../../components/UI/PopUp/PopUpType1';

const PopUpPage = () => {
  const [popup1Visible, setPopup1Visible] = useState(false);
  const [popup2Visible, setPopup2Visible] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <PopUpType1
        isVisible={popup1Visible}
        setPopup1Visible={setPopup1Visible}
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
            backgroundColor: '#25a765',
            width: '50%',
            alignSelf: 'center',
            paddingHorizontal: 20,
            paddingVertical: 20,
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
            backgroundColor: '#25a765',
            width: '50%',
            alignSelf: 'center',
            paddingHorizontal: 20,
            paddingVertical: 20,
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
      </View>
    </SafeAreaView>
  );
};

export default PopUpPage;
