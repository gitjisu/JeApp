import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

// component
import TopFillTab2 from '../../components/UI/TopFillTab2';
import BottomFillTab2 from '../../components/UI/BottomFillTab2';
import {font} from '../../styles/globalStyles';

import {TopFillTab2Ref} from '../../components/UI/TopFillTab2';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';

const data = [
  {
    key: 'jungkook',
    image: require('../../assets/jungkook1.png'),
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
  },
  {
    key: 'timo',
    image: require('../../assets/timo.png'),
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
  },
];

type RenderItemType = {
  item: (typeof data)[0];
  index: number;
};

const TopFillTab2Page = () => {
  const topFillTabRef = useRef<TopFillTab2Ref>(null);
  const flatListRef = useRef<FlatList>(null);

  const handleParentPageByChildIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({animated: true, index: index});
    }
  };

  const renderItem = ({item, index}: RenderItemType) => (
    <ScrollView
      nestedScrollEnabled={true}
      style={{
        flex: 1,
        paddingHorizontal: 16,
        height: '100%',
        width: Dimensions.get('window').width,
      }}>
      <View style={{width: '100%'}}>
        <Image
          style={{width: '100%'}}
          resizeMode="contain"
          source={item.image}
        />
      </View>
      <Text
        style={{
          fontFamily: font.preReg,
          fontSize: 18,
          color: '#5e6570',
          lineHeight: 36,
        }}>
        {index} :{item.text}
      </Text>
      <View style={{height: 68, width: '100%'}}></View>
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <GestureDetector gesture={test}>
        <FlatList
          ref={flatListRef}
          horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          decelerationRate={'fast'}
          snapToOffsets={[Dimensions.get('window').width]}
        />
      </GestureDetector>
      <BottomFillTab2
        ref={topFillTabRef}
        text1="바텀정구기"
        text2="바텀티모"
        handleParentPageByChildIndex={handleParentPageByChildIndex}
      />
    </SafeAreaView>
  );
};

export default TopFillTab2Page;
