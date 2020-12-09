import React from 'react'
import { Dimensions, Platform } from 'react-native'
import styled from 'styled-components/native'

import { OfferPlaceholder } from 'ui/svg/OfferPlaceholder'
import { Rectangle } from 'ui/svg/Rectangle'
import { ColorsEnum, getSpacing, Spacer, getShadow } from 'ui/theme'
import { BorderRadiusEnum } from 'ui/theme/grid'
import { useCustomSafeInsets } from 'ui/theme/useCustomSafeInsets'

interface Props {
  imageUrl: string
}

export const OfferHero: React.FC<Props> = ({ imageUrl }) => {
  const { top } = useCustomSafeInsets()
  return (
    <HeroContainer>
      <BlurImage
        extraHeight={top}
        blurRadius={Platform.OS === 'android' ? 5 : 20}
        resizeMode={'cover'}
        source={{ uri: imageUrl }}
      />
      {/** Add 1 pixel to avoid 1 white pixel on androids */}
      <Rectangle size={screenWidth + 1} />
      <ImageContainer>
        {imageUrl ? (
          <Image resizeMode="cover" source={{ uri: imageUrl }} />
        ) : (
          <OfferPlaceholder width={imageWidth} height={imageHeight} />
        )}
      </ImageContainer>
      <Spacer.Column numberOfSpaces={20} />
    </HeroContainer>
  )
}
const imageWidth = getSpacing(53)
const imageHeight = getSpacing(79)
const screenWidth = Dimensions.get('window').width

const HeroContainer = styled.View({ alignItems: 'center' })
const BlurImage = styled.Image<{ extraHeight: number }>(({ extraHeight }) => ({
  height: getSpacing(76) + extraHeight,
  width: screenWidth,
}))
const ImageContainer = styled.View({
  position: 'absolute',
  bottom: 0,
  borderRadius: BorderRadiusEnum.BORDER_RADIUS,
  ...getShadow({
    shadowOffset: {
      width: 0,
      height: getSpacing(2),
    },
    shadowRadius: getSpacing(3),
    shadowColor: ColorsEnum.BLACK,
    shadowOpacity: 0.2,
  }),
})
const Image = styled.Image({
  borderRadius: BorderRadiusEnum.BORDER_RADIUS,
  height: imageHeight,
  width: imageWidth,
})
