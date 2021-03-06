import LottieView from 'lottie-react-native'
import React, { FunctionComponent } from 'react'
import { ScrollView, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

import { AnimationObject } from 'ui/animations/type'
import { Background } from 'ui/svg/Background'
import { IconInterface } from 'ui/svg/icons/types'
import { ColorsEnum, getSpacing, Spacer, Typo } from 'ui/theme'

type Props = {
  animation?: AnimationObject
  animationSize?: number
  icon?: FunctionComponent<IconInterface>
  iconSize?: number
  title: string
}

export const GenericInfoPage: FunctionComponent<Props> = (props) => {
  const {
    animation,
    animationSize = getSpacing(45),
    icon: Icon,
    iconSize = getSpacing(25),
    title,
  } = props
  return (
    <React.Fragment>
      <Background />
      <ScrollView contentContainerStyle={scrollViewContentContainerStyle}>
        <Spacer.Column numberOfSpaces={18} />
        {Icon ? (
          <React.Fragment>
            <Icon color={ColorsEnum.WHITE} size={iconSize} />
            <Spacer.Column numberOfSpaces={9} />
          </React.Fragment>
        ) : (
          animation && (
            <React.Fragment>
              <StyledLottieView source={animation} autoPlay loop={false} size={animationSize} />
              <Spacer.Column numberOfSpaces={9} />
            </React.Fragment>
          )
        )}
        <StyledTitle2>{title}</StyledTitle2>
        <Spacer.Column numberOfSpaces={5} />
        {props.children}
        <Spacer.BottomScreen />
      </ScrollView>
    </React.Fragment>
  )
}

const scrollViewContentContainerStyle: ViewStyle = {
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: getSpacing(4),
}

const StyledLottieView = styled(LottieView)((props: { size: number }) => ({
  width: props.size,
  height: props.size,
}))

const StyledTitle2 = styled(Typo.Title2).attrs({
  color: ColorsEnum.WHITE,
})({
  textAlign: 'center',
})
