import React from 'react'
import { PixelRatio } from 'react-native'
import styled from 'styled-components/native'

import { ColorsEnum, Typo, MARGIN_DP, GUTTER_DP, getSpacing } from 'ui/theme'
import { BorderRadiusEnum } from 'ui/theme/grid'

interface ImageCaptionProps {
  category: string
  distance?: string
  imageWidth: number
}

export const ImageCaption = ({ category, imageWidth, distance }: ImageCaptionProps) => {
  return (
    <Row width={imageWidth}>
      <TextWrapper>
        <Typo.Caption color={ColorsEnum.WHITE} numberOfLines={1} testID="categoryImageCaption">
          {category}
        </Typo.Caption>
      </TextWrapper>
      {distance && (
        <React.Fragment>
          <Separator />
          <TextWrapper>
            <Typo.Caption color={ColorsEnum.WHITE} testID="distanceImageCaption">
              {distance}
            </Typo.Caption>
          </TextWrapper>
        </React.Fragment>
      )}
    </Row>
  )
}

const rowHeight = PixelRatio.roundToNearestPixel(MARGIN_DP)
const textLineHeight = PixelRatio.roundToNearestPixel(GUTTER_DP)

const Row = styled.View<{ width: number }>(({ width }) => ({
  flexDirection: 'row',
  backgroundColor: ColorsEnum.BLACK,
  height: rowHeight,
  width,
  borderBottomLeftRadius: BorderRadiusEnum.BORDER_RADIUS,
  borderBottomRightRadius: BorderRadiusEnum.BORDER_RADIUS,
  alignItems: 'center',
}))

const Separator = styled.View({
  height: textLineHeight,
  backgroundColor: ColorsEnum.WHITE,
  width: 1,
})

const TextWrapper = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  // So all categories are entirely visibles on homepage offer tiles
  paddingHorizontal: getSpacing(0.5),
  flex: 1,
})
