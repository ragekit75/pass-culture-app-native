import React, { useState } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'

import { OfferTile, ModuleTitle } from 'features/home/atoms'
import { Offers, OffersWithCover } from 'features/home/contentful'
import { AlgoliaHit } from 'libs/algolia'
import { algoliaHits } from 'libs/algolia/algoliaHits'
import { Gutter, Margin } from 'ui/theme'

type OfferWithOptionalCover = Partial<OffersWithCover> & Pick<Offers, 'algolia' | 'display'>

export const OffersModule = (props: OfferWithOptionalCover) => {
  const { algolia, display } = props
  const { minOffers, title } = display
  // TODO(agarcia): actually get hits and nbHits from querying algolia
  const [hits] = useState<AlgoliaHit[]>(algoliaHits)
  const [nbHits] = useState(20)

  const atLeastOneHit = hits.length > 0
  const minOffersHasBeenReached = nbHits >= minOffers
  const shouldModuleBeDisplayed = atLeastOneHit && minOffersHasBeenReached
  const showSeeMore =
    hits.length < nbHits &&
    !('tags' in algolia || 'beginningDatetime' in algolia || 'endingDatetime' in algolia)

  if (!shouldModuleBeDisplayed) return <></>

  return (
    <Container>
      <Margin horizontal />
      <ModuleTitle title={title} />
      <Gutter horizontal />
      <FlatList
        horizontal
        data={hits}
        renderItem={({ item }) => <OfferTile tile={item} />}
        keyExtractor={(item) => item.objectID}
        ListHeaderComponent={() => <Margin />}
        ItemSeparatorComponent={() => <Gutter />}
        ListFooterComponent={showSeeMore ? <></> : <></>} // TODO: 'See more' design
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  )
}

const Container = styled.View({ flex: 1 })