import { t } from '@lingui/macro'
import React from 'react'

import { CenteredSection, TitleWithCount } from 'features/search/atoms'
import { MAX_PRICE } from 'features/search/pages/reducer.helpers'
import { useSearch } from 'features/search/pages/SearchWrapper'
import { _ } from 'libs/i18n'
import { Range } from 'libs/typesUtils/typeHelpers'
import { Slider } from 'ui/components/inputs/Slider'

const formatEuro = (price: number) => `${price} €`

export const Price: React.FC = () => {
  const { searchState, dispatch } = useSearch()
  const values = searchState.priceRange ?? [0, MAX_PRICE]
  const count = +(values[0] > 0 || values[1] < MAX_PRICE)

  const onValuesChange = (newValues: number[]) => {
    dispatch({ type: 'PRICE_RANGE', payload: newValues as Range<number> })
  }

  return (
    <CenteredSection title={<TitleWithCount title={_(t`Prix`)} count={count} />}>
      <Slider
        showValues={true}
        values={values}
        max={MAX_PRICE}
        formatValues={formatEuro}
        onValuesChange={onValuesChange}
      />
    </CenteredSection>
  )
}