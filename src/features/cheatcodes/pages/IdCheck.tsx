import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { WebView } from 'react-native-webview'

import { RootStackParamList } from 'features/navigation/RootNavigator'

const ID_CHECK_URL = 'https://id-check-front-dev.passculture.app/'

type CheatCodesNavigationProp = StackNavigationProp<RootStackParamList, 'IdCheck'>

type Props = {
  navigation: CheatCodesNavigationProp
}

export const IdCheck: React.FC<Props> = function () {
  return (
    <WebView
      source={{ uri: ID_CHECK_URL }}
      style={styles.webview}
      startInLoadingState={true}
      renderLoading={() => <Text>Loading...</Text>}
    />
  )
}

const styles = StyleSheet.create({
  webview: { overflow: 'hidden', flex: 1 },
})