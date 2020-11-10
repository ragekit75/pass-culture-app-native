import React from 'react'
import { Dimensions, PixelRatio, View, Linking } from 'react-native'
import styled from 'styled-components/native'

import { IdeaIcon } from 'features/home/assets/IdeaIcon'
import { NextArrowIcon } from 'features/home/assets/NextArrowIcon'
import { BusinessPane } from 'features/home/contentful'
import {
  Typo,
  ColorsEnum,
  getSpacing,
  Margin,
  BORDER_RADIUS,
  MARGIN_DP,
  LENGTH_S,
  RATIO_BUSINESS,
} from 'ui/theme'

export const BusinessModule = ({ firstLine, secondLine, image, url }: BusinessPane) => {
  const openUrl = () => {
    url && Linking.openURL(url)
  }
  return (
    <View>
      <Margin horizontal />
      <Row>
        {/** Explicitly defining Margin component for easier use for other components, with gutters */}
        <Margin />
        <TouchableHighlight onPress={openUrl}>
          <ImageContainer>
            <ImageBackground source={{ uri: image }} testID="imageBusiness">
              <Container>
                <IconContainer>
                  <IdeaIcon />
                </IconContainer>
                <TextContainer>
                  <Typo.ButtonText color={ColorsEnum.WHITE}>{firstLine}</Typo.ButtonText>
                  <Typo.Body numberOfLines={2} color={ColorsEnum.WHITE}>
                    {secondLine}
                  </Typo.Body>
                </TextContainer>
                <NextArrowIcon />
              </Container>
            </ImageBackground>
          </ImageContainer>
        </TouchableHighlight>
        <Margin />
      </Row>
    </View>
  )
}

const imageWidth = Dimensions.get('window').width - 2 * MARGIN_DP
const imageHeight = PixelRatio.roundToNearestPixel(imageWidth * RATIO_BUSINESS)

const Row = styled.View({
  flexDirection: 'row',
})

const TouchableHighlight = styled.TouchableHighlight({
  borderRadius: BORDER_RADIUS,
})

const ImageContainer = styled.View({
  borderRadius: BORDER_RADIUS,
  overflow: 'hidden',
  maxHeight: LENGTH_S,
})

const ImageBackground = styled.ImageBackground({
  height: imageHeight,
  width: imageWidth,
  justifyContent: 'center',
  maxHeight: LENGTH_S,
})

const Container = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  padding: getSpacing(2),
})

const TextContainer = styled.View({
  flex: 1,
  flexDirection: 'column',
  padding: getSpacing(1),
})

const IconContainer = styled.View({
  width: 56,
  height: 56,
})