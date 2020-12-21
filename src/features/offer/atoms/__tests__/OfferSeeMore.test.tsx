import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { logConsultDescriptionDetails } from 'libs/analytics'

import { dehumanizeId } from '../../services/dehumanizeId'
import { OfferSeeMore } from '../OfferSeeMore'

const humanizedOfferId = 'AHD3A'
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const offerId = dehumanizeId(humanizedOfferId)!

describe('OfferSeeMore', () => {
  it('displays the short wording when no props are precised', () => {
    const { queryByText } = render(<OfferSeeMore id={123} />)
    expect(queryByText("Voir plus d'informations")).toBeFalsy()
    expect(queryByText('voir plus')).toBeTruthy()
  })
  it('displays the long wording when precised', () => {
    const { queryByText } = render(<OfferSeeMore id={123} longWording />)
    expect(queryByText('voir plus')).toBeFalsy()
    expect(queryByText("Voir plus d'informations")).toBeTruthy()
  })
  describe('Analytics', () => {
    it('should log ConsultDescriptionDetails each time we open the details', async () => {
      const { getByTestId } = render(<OfferSeeMore id={offerId} longWording />)

      fireEvent.press(getByTestId('description-details-button'))
      expect(logConsultDescriptionDetails).toHaveBeenCalledTimes(1)
      expect(logConsultDescriptionDetails).toHaveBeenCalledWith(offerId)

      fireEvent.press(getByTestId('description-details-button'))
      expect(logConsultDescriptionDetails).toHaveBeenCalledTimes(2)
    })
  })
})
