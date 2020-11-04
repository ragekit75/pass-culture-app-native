import { t } from '@lingui/macro'
import React from 'react'
import { Text, View, PixelRatio } from 'react-native'
import styled from 'styled-components/native'

import { Layout } from 'features/home/contentful'
import { AlgoliaHit } from 'libs/algolia'
import { _ } from 'libs/i18n'
import {
  ColorsEnum,
  Typo,
  BORDER_RADIUS,
  MARGIN_DP,
  GUTTER_DP,
  LENGTH_M,
  LENGTH_L,
  RATIO_ALGOLIA,
} from 'ui/theme'

const formatPrice = (price?: number): string => {
  return price ? `${price} €`.replace('.', ',') : 'Gratuit'
}

interface OfferTileProps {
  tile: AlgoliaHit
  layout?: Layout
}

export const OfferTile = ({ tile: { offer }, layout = 'one-item-medium' }: OfferTileProps) => {
  const imageHeight = layout === 'two-items' ? LENGTH_M : LENGTH_L
  const imageWidth = PixelRatio.roundToNearestPixel(imageHeight * RATIO_ALGOLIA)

  return (
    <Container>
      <TouchableHighlight
        imageHeight={imageHeight}
        onPress={() => console.log(`Opening offer ${offer.id}...`)} // eslint-disable-line no-console
      >
        <View>
          <Image
            imageHeight={imageHeight}
            imageWidth={imageWidth}
            source={{ uri: offer.thumbUrl }}
            testID="offerTileImage"
          />
          <Row>
            <TextWrapper>
              <Typo.Caption color={ColorsEnum.WHITE}>{offer.category}</Typo.Caption>
            </TextWrapper>
            <Separator />
            <TextWrapper>
              <Typo.Caption color={ColorsEnum.WHITE}>
                <Text>{'1,2km'}</Text>
              </Typo.Caption>
            </TextWrapper>
          </Row>
        </View>
      </TouchableHighlight>

      <CaptionContainer imageWidth={imageWidth}>
        <Typo.Caption numberOfLines={1}>{offer.name}</Typo.Caption>
        <Typo.Caption color={ColorsEnum.GREY_DARK}>
          <Text>{'Dès le 12 mars 2020'}</Text>
        </Typo.Caption>
        <Typo.Caption color={ColorsEnum.GREY_DARK}>
          {offer.isDuo
            ? `${formatPrice(offer.priceMin)} - ${_(/*i18n: Duo offer */ t`Duo`)}`
            : formatPrice(offer.priceMin)}
        </Typo.Caption>
      </CaptionContainer>
    </Container>
  )
}

const rowHeight = PixelRatio.roundToNearestPixel(MARGIN_DP)
const textLineHeight = PixelRatio.roundToNearestPixel(GUTTER_DP)

const Container = styled.View({
  flex: 1,
})

const TouchableHighlight = styled.TouchableHighlight<{ imageHeight: number }>(
  ({ imageHeight }) => ({
    borderRadius: BORDER_RADIUS,
    height: imageHeight + rowHeight,
    flex: 1,
  })
)

const CaptionContainer = styled.View<{ imageWidth: number }>(({ imageWidth }) => ({
  maxWidth: imageWidth,
  marginTop: PixelRatio.roundToNearestPixel(GUTTER_DP / 2),
}))

const Image = styled.Image<{ imageWidth: number; imageHeight: number }>(
  ({ imageWidth, imageHeight }) => ({
    height: imageHeight,
    width: imageWidth,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
  })
)

const Row = styled.View({
  flexDirection: 'row',
  backgroundColor: ColorsEnum.BLACK,
  height: rowHeight,
  width: '100%',
  borderBottomLeftRadius: BORDER_RADIUS,
  borderBottomRightRadius: BORDER_RADIUS,
  alignItems: 'center',
})

const Separator = styled.View({
  height: textLineHeight,
  backgroundColor: ColorsEnum.WHITE,
  width: 1,
})

const TextWrapper = styled.View({
  alignItems: 'center',
  width: '50%',
})
