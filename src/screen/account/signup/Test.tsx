import { View, Text } from 'react-native'
import React from 'react'
import { AppNavigationType } from '../../../navigation/StackBase'
import WebView from 'react-native-webview'

type Props = {
    navigation : AppNavigationType
}

const Test = ({navigation} : Props) => {
  return (
    <WebView allowsBackForwardNavigationGestures source={{uri: 'https://www.naver.com'}}></WebView>
  )
}

export default Test