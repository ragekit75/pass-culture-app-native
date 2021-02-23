import { t } from '@lingui/macro'
import React from 'react'

import { _ } from 'libs/i18n'
import { Spacer, Typo } from 'ui/theme'

import { Calendar } from './Calendar/Calendar'

export const BookDateChoice: React.FC = () => {
  return (
    <React.Fragment>
      <Spacer.Column numberOfSpaces={4} />
      <Typo.Title4>{_(t`Date`)}</Typo.Title4>
      <Calendar />
    </React.Fragment>
  )
}
