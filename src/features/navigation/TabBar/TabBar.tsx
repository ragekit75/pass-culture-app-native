import { BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import styled from 'styled-components/native'

import { BicolorBookings } from 'ui/svg/icons/BicolorBookings'
import { BicolorFavorite } from 'ui/svg/icons/BicolorFavorite'
import { BicolorLogo } from 'ui/svg/icons/BicolorLogo'
import { BicolorProfile } from 'ui/svg/icons/BicolorProfile'
import { BicolorSearch } from 'ui/svg/icons/BicolorSearch'
import { BicolorIconInterface } from 'ui/svg/icons/types'
import { ColorsEnum, getShadow, getSpacing, Spacer, UniqueColors } from 'ui/theme'

import { useCustomSafeInsets } from '../../../ui/theme/useCustomSafeInsets'

import { TabBarComponent } from './TabBarComponent'
import { TabRouteName } from './types'

const mapRouteToIcon = (
  route: TabRouteName | string
): ((props: BicolorIconInterface) => React.ReactNode) => {
  switch (route) {
    case 'HomeNavigator':
      return BicolorLogo
    case 'Search':
      return BicolorSearch
    case 'Bookings':
      return BicolorBookings
    case 'Favorites':
      return BicolorFavorite
    case 'Profile':
      return BicolorProfile
    default:
      return BicolorLogo
  }
}
export const TabBar: React.FC<Pick<
  BottomTabBarProps<BottomTabBarOptions>,
  'state' | 'navigation'
>> = ({ navigation, state }) => {
  const { bottom } = useCustomSafeInsets()
  return (
    <MainContainer>
      <RowContainer>
        <Spacer.Row numberOfSpaces={4} />
        {state.routes.map((route, index) => {
          const isSelected = state.index === index
          const routeName = state.routeNames[index]
          const onPress = () => {
            if (isSelected) return

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })
            if (!event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }
          return (
            <TabBarComponent
              key={`key-tab-nav-${index}-${route.key}`}
              isSelected={isSelected}
              bicolorIcon={mapRouteToIcon(routeName)}
              onPress={onPress}
              testID={`tab-${routeName}`}
            />
          )
        })}
        <Spacer.Row numberOfSpaces={4} />
      </RowContainer>
      <SafeAreaPlaceholder safeHeight={bottom} />
    </MainContainer>
  )
}
const RowContainer = styled.View({
  flexDirection: 'row',
})
const SafeAreaPlaceholder = styled.View<{ safeHeight: number }>(({ safeHeight }) => ({
  height: safeHeight,
}))
const MainContainer = styled.View({
  alignItems: 'center',
  border: getSpacing(1 / 4),
  borderColor: ColorsEnum.GREY_LIGHT,
  backgroundColor: UniqueColors.TAB_BAR,
  width: '100%',
  position: 'absolute',
  bottom: 0,
  ...getShadow({
    shadowOffset: {
      width: 0,
      height: getSpacing(1 / 4),
    },
    shadowRadius: getSpacing(1),
    shadowColor: ColorsEnum.BLACK,
    shadowOpacity: 0.2,
  }),
})
