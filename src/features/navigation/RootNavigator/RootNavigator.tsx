import { NavigationContainer, Theme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import CodePush from 'react-native-code-push'

import { useListenDeepLinksEffect } from 'features/deeplinks'
import { PrivacyPolicy } from 'features/firstLogin/PrivacyPolicy/PrivacyPolicy'
import { useCodePush } from 'libs/codepush/CodePushProvider'
import { useHideSplashScreen } from 'libs/splashscreen'
import { ColorsEnum } from 'ui/theme'

import { navigationRef } from '../navigationRef'
import { onNavigationStateChange } from '../services'

import routes from './routes'
import { RootStackParamList, Route } from './types'
import { useGetInitialScreenConfig } from './useGetInitialRouteName'

export const RootStack = createStackNavigator<RootStackParamList>()

const theme = { colors: { background: ColorsEnum.WHITE } } as Theme

export function wrapRoute(route: Route) {
  if (route.hoc) {
    route.component = route.hoc(route.component)
  }
  return route
}

const screens = routes
  .map(wrapRoute)
  .map((route: Route) => (
    <RootStack.Screen
      key={route.name}
      name={route.name}
      component={route.component}
      options={route.options}
    />
  ))

export const RootNavigator: React.FC = () => {
  const [shouldHideSplashScreen, setShoudHideSplashScreen] = useState(false)

  const initialScreenConfig = useGetInitialScreenConfig()
  const { isSplashScreenHidden } = useHideSplashScreen({ shouldHideSplashScreen })
  const { status } = useCodePush()
  const isCodePushUpToDate = status === CodePush.SyncStatus.UP_TO_DATE

  useEffect(() => {
    if (!navigationRef.current || !initialScreenConfig || !isCodePushUpToDate) {
      return
    }
    const { screen, params } = initialScreenConfig
    navigationRef.current.navigate(screen, params)
    setShoudHideSplashScreen(true)
  }, [navigationRef.current, initialScreenConfig, isCodePushUpToDate])

  useListenDeepLinksEffect()

  const isAppReadyToRender =
    navigationRef.current != null && initialScreenConfig != undefined && isCodePushUpToDate
  return (
    <NavigationContainer onStateChange={onNavigationStateChange} ref={navigationRef} theme={theme}>
      {isAppReadyToRender && (
        <RootStack.Navigator
          initialRouteName={'TabNavigator'}
          headerMode="screen"
          screenOptions={{ headerShown: false }}>
          {screens}
        </RootStack.Navigator>
      )}
      {/* The components below are those for which we do not want
      their rendering to happen while the splash is displayed. */}
      {isAppReadyToRender && isSplashScreenHidden && <PrivacyPolicy />}
    </NavigationContainer>
  )
}
