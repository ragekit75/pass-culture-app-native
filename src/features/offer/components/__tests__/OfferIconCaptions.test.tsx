import { act, render } from '@testing-library/react-native'
import { rest } from 'msw'
import React from 'react'
import waitForExpect from 'wait-for-expect'

import { UserProfileResponse } from 'api/gen'
import { AlgoliaHit } from 'libs/algolia'
import { mockedAlgoliaResponse } from 'libs/algolia/mockedResponses/mockedAlgoliaResponse'
import { env } from 'libs/environment'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { server } from 'tests/server'
import { flushAllPromises } from 'tests/utils'

import { OfferIconCaptions } from '../OfferIconCaptions'

const notDuoOffer: AlgoliaHit = mockedAlgoliaResponse.hits[0]
const duoOffer: AlgoliaHit = mockedAlgoliaResponse.hits[2]

jest.mock('features/auth/AuthContext', () => ({
  useAuthContext: jest.fn(() => ({ isLoggedIn: true })),
}))

const userProfileAPIResponse: UserProfileResponse = {
  email: 'email@domain.ext',
  first_name: 'Jean',
  is_beneficiary: true,
}

describe('<OfferIconCaptions />', () => {
  it('should match snapshot', async () => {
    const { toJSON } = await renderOfferIconCaptions()
    expect(toJSON()).toMatchSnapshot()
  })

  it.each`
    duo      | beneficiary | show
    ${true}  | ${true}     | ${'show'}
    ${false} | ${true}     | ${'not show'}
    ${true}  | ${false}    | ${'not show'}
    ${false} | ${false}    | ${'not show'}
  `(
    'should $show Icon isDuo for Duo=$duo offers for beneficiary=$beneficiary users',
    async ({ show, duo, beneficiary }) => {
      const component = await renderOfferIconCaptions({
        algoliaHit: duo ? duoOffer : notDuoOffer,
        isBeneficiary: beneficiary,
      })
      await waitForExpect(() => {
        if (show === 'show') {
          expect(component.queryByText(/À deux !/)).toBeTruthy()
        } else {
          expect(component.queryByText(/À deux !/)).toBeNull()
        }
      })
      component.unmount()
    }
  )
})

async function renderOfferIconCaptions({
  algoliaHit,
  isBeneficiary = true,
}: {
  algoliaHit?: AlgoliaHit
  isBeneficiary?: boolean
} = {}) {
  server.use(
    rest.get(env.API_BASE_URL + '/native/v1/me', (_req, res, ctx) =>
      res.once(
        ctx.status(200),
        ctx.json({ ...userProfileAPIResponse, is_beneficiary: isBeneficiary })
      )
    )
  )
  const wrapper = render(
    reactQueryProviderHOC(<OfferIconCaptions algoliaHit={algoliaHit ?? notDuoOffer} />)
  )
  await act(async () => {
    await flushAllPromises()
  })
  return wrapper
}