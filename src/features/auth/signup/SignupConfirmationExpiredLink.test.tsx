import { StackScreenProps } from '@react-navigation/stack'
import { render, fireEvent } from '@testing-library/react-native'
import React from 'react'
import { Alert, Linking } from 'react-native'
import waitForExpect from 'wait-for-expect'

import { navigate } from '__mocks__/@react-navigation/native'
import { RootStackParamList } from 'features/navigation/RootNavigator'

import { SignupConfirmationExpiredLink } from './SignupConfirmationExpiredLink'

beforeEach(() => {
  jest.resetAllMocks()
})

const navigationProps = { route: { params: { email: 'test@email.com' } } }

function renderSignupConfirmationExpiredLink() {
  return render(
    <SignupConfirmationExpiredLink
      {...(navigationProps as StackScreenProps<
        RootStackParamList,
        'SignupConfirmationExpiredLink'
      >)}
    />
  )
}

describe('<SignupConfirmationExpiredLink/>', () => {
  it('should redirect to home page WHEN go back to home button is clicked', async () => {
    const { findByText } = renderSignupConfirmationExpiredLink()

    const button = await findByText("Retourner à l'accueil")
    fireEvent.press(button)

    await waitForExpect(() => {
      expect(navigate).toBeCalledTimes(1)
    })
  })

  it('should contact support WHEN contact support button is clicked', async () => {
    const { findByText } = renderSignupConfirmationExpiredLink()

    const button = await findByText('Contacter le support')
    fireEvent.press(button)

    await waitForExpect(() => {
      expect(Linking.openURL).toBeCalledTimes(1)
    })
  })

  it('should redirect to signup confirmation email sent page WHEN clicking on resend email and response is success', async () => {
    const { findByText } = renderSignupConfirmationExpiredLink()

    const button = await findByText("Renvoyer l'email")
    fireEvent.press(button)

    expect(Alert.alert).toBeCalledTimes(1)
    // TODO :
    // await waitForExpect(() => {
    //   expect(navigate).toBeCalledTimes(1)
    //   expect(navigate).toBeCalledWith('SignupConfirmationEmailSent', {
    //     email: 'test@email.com',
    //   })
    // })
  })

  it('should NOT redirect to signup confirmation email sent page WHEN clicking on resend email and response is failure', async () => {
    // TODO
    // server.use(
    //   rest.post(env.API_BASE_URL + '/native/v1/something', async (req, res, ctx) =>
    //     res.once(ctx.status(403))
    //   )
    // )

    const { findByText } = renderSignupConfirmationExpiredLink()

    const button = await findByText("Renvoyer l'email")
    fireEvent.press(button)

    await waitForExpect(() => {
      expect(navigate).not.toBeCalled()
      expect(Alert.alert).toBeCalledTimes(1)
    })
  })
})