import {View, Text, FlatList, Dimensions, Image} from 'react-native';
import React, {useRef} from 'react';
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';
import TopFillTab3, {TopFillTab3Ref} from '../../components/UI/TopFillTab3';
import {SafeAreaView} from 'react-native-safe-area-context';
import {font} from '../../styles/globalStyles';

const data = [
  {
    key: 'penguin',
    image: require('../../assets/penguin.png'),
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
  },
  {
    key: 'panda',
    image: require('../../assets/panda.png'),
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
  },
  {
    key: 'bulgogi',
    image: require('../../assets/bulgogi.png'),
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
  },
];
type RenderItemType = {
  item: (typeof data)[0];
  index: number;
};
const TopFillTab3Page = () => {
  const topFillTabRef = useRef<TopFillTab3Ref>(null);
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
    </ScrollView>
  );

  const swipe = Gesture.Pan()
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
        if (topFillTabRef.current?.fillTabPosition != 2) {
          flatListRef.current?.scrollToOffset({
            animated: true,
            offset: -e.translationX,
          });
        }
      }
    })
    .onEnd(e => {
      if (e.translationX > 0) {
        if (topFillTabRef.current?.fillTabPosition === 1) {
          topFillTabRef.current?.handlePressLeft();
        } else if (topFillTabRef.current?.fillTabPosition === 2) {
          topFillTabRef.current?.handlePressCenter();
        }
      } else {
        if (topFillTabRef.current?.fillTabPosition === 0) {
          topFillTabRef.current?.handlePressCenter();
        } else if (topFillTabRef.current?.fillTabPosition === 1) {
          topFillTabRef.current?.handlePressRight();
        }
      }
    });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <TopFillTab3
        ref={topFillTabRef}
        text1="펭구인"
        text2="판다"
        text3="불고기아저씨"
        handleParentPageByChildIndex={handleParentPageByChildIndex}
      />
      <GestureDetector gesture={swipe}>
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
    </SafeAreaView>
  );
};

export default TopFillTab3Page;
