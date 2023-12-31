import {View, Text, Dimensions, Image, FlatList, Pressable} from 'react-native';
import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PopUpType1 from '../../components/UI/PopUp/PopUpType1';
// component
import BottomFillTab2, {
  BottomFillTab2Ref,
} from '../../components/UI/BottomFillTab2';
import {font} from '../../styles/globalStyles';

import {
  GestureDetector,
  Gesture,
  ScrollView,
} from 'react-native-gesture-handler';

import {BlurView} from '@react-native-community/blur';

const data = [
  {
    key: 'jungkook',
    image: require('../../assets/jungkook1.png'),
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
  },
  {
    key: 'timo',
    image: require('../../assets/timo.png'),
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
  },
];

type RenderItemType = {
  item: (typeof data)[0];
  index: number;
};

const BottomFillTab2Page = () => {
  const topFillTabRef = useRef<BottomFillTab2Ref>(null);
  const flatListRef = useRef<FlatList>(null);

  const handleParentPageByChildIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({animated: true, index: index});
    }
  };
  const [popup1Visible, setPopup1Visible] = useState(false);
  const renderItem = ({item, index}: RenderItemType) => (
    <ScrollView
      nestedScrollEnabled={true}
      style={{
        flex: 1,
        paddingHorizontal: 16,
        height: '100%',
        width: Dimensions.get('window').width,
      }}>
      <PopUpType1
        isVisible={popup1Visible}
        setPopup1Visible={setPopup1Visible}
      />
      <View style={{width: '100%'}}>
        <Image
          style={{width: '100%'}}
          resizeMode="contain"
          source={item.image}
        />
        <BlurView
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: '#rgba(200,0,0,0.5)',
          }}
          blurType="light"
          reducedTransparencyFallbackColor="white"
        />
      </View>
      <Pressable
        onPress={() => {
          setPopup1Visible(prev => !prev);
        }}>
        <Text
          style={{
            fontFamily: font.preReg,
            fontSize: 18,
            color: '#5e6570',
            lineHeight: 36,
          }}>
          {index} :{item.text}
        </Text>
      </Pressable>
    </ScrollView>
  );

  const test = Gesture.Pan()
    .runOnJS(true)
    .onUpdate(e => {
      if (e.translationX > 0) {
        if (topFillTabRef.current?.fillTabPosition != 0) {
          flatListRef.current?.scrollToOffset({
            animated: true,
            offset: e.translationX,
          });
        }
      } else {
        if (topFillTabRef.current?.fillTabPosition != 1) {
          flatListRef.current?.scrollToOffset({
            animated: true,
            offset: -e.translationX,
          });
        }
      }
    })
    .onEnd(e => {
      if (e.translationX > 0) {
        topFillTabRef.current?.handlePressLeft();
      } else {
        topFillTabRef.current?.handlePressRight();
      }
    });

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#ffffff'}}
      edges={['top', 'left', 'right']}>
      <GestureDetector gesture={test}>
        <FlatList
          nestedScrollEnabled={true}
          ref={flatListRef}
          horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          decelerationRate={'fast'}
          snapToOffsets={[Dimensions.get('window').width]}
          scrollEnabled={false}
        />
      </GestureDetector>

      <BottomFillTab2
        ref={topFillTabRef}
        text1="탑정구기보러가기"
        text2="탑티모보러가기"
        handleParentPageByChildIndex={handleParentPageByChildIndex}
      />
    </SafeAreaView>
  );
};

export default BottomFillTab2Page;
