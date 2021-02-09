import React, { useCallback } from 'react'

import { SectionWithSwitch } from 'features/search/components/SectionWithSwitch'
import { useSearch } from 'features/search/pages/SearchWrapper'
import { SectionTitle } from 'features/search/sections/titles'
import { useLogFilterOnce } from 'features/search/utils/useLogFilterOnce'

export const DuoOffer: React.FC = () => {
  const { searchState, dispatch } = useSearch()
  const logUseFilter = useLogFilterOnce(SectionTitle.Duo)

  const toggle = useCallback(() => {
    dispatch({ type: 'TOGGLE_OFFER_DUO' })
    logUseFilter()
  }, [])

  return (
    <SectionWithSwitch
      testID="duoFilter"
      title={SectionTitle.Duo}
      active={searchState.offerIsDuo}
      toggle={toggle}
    />
  )
}
