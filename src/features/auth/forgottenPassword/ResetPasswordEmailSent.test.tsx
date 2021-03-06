import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { act, fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'
import { openInbox } from 'react-native-email-link'
import waitForExpect from 'wait-for-expect'

import { analytics } from 'libs/analytics'
import { flushAllPromises } from 'tests/utils'

import { contactSupport } from '../support.services'

import { ResetPasswordEmailSent } from './ResetPasswordEmailSent'

jest.mock('@react-navigation/native', () => jest.requireActual('@react-navigation/native'))

describe('<ResetPasswordEmailSent />', () => {
  it('should match snapshot', async () => {
    const renderAPI = await renderInitialPage('ResetPasswordEmailSent')
    expect(renderAPI).toMatchSnapshot()
  })

  it('should redirect to previous screen when clicking on ArrowPrevious icon', async () => {
    const renderAPI = await renderInitialPage('PreviousScreen')

    await act(async () => {
      navigationRef.current?.navigate('ResetPasswordEmailSent')
    })
    const leftIcon = renderAPI.getByTestId('leftIcon')
    fireEvent.press(leftIcon)

    await waitForExpect(() => {
      expect(renderAPI.queryByText('PreviousScreenText')).toBeTruthy()
    })
  })

  it('should redirect to Home when clicking on Close icon', async () => {
    const renderAPI = await renderInitialPage('ResetPasswordEmailSent')

    const rightIcon = renderAPI.getByTestId('rightIcon')
    fireEvent.press(rightIcon)

    await waitForExpect(() => {
      expect(renderAPI.queryByText('HomeText')).toBeTruthy()
    })
  })

  it('should open mail app when clicking on contact support button', async () => {
    const renderAPI = await renderInitialPage('ResetPasswordEmailSent')

    const contactSupportButton = renderAPI.getByText('Contacter le support')
    fireEvent.press(contactSupportButton)

    await waitForExpect(() => {
      expect(analytics.logContactSupportResetPasswordEmailSent).toBeCalledTimes(1)
      expect(contactSupport.forResetPasswordEmailNotReceived).toHaveBeenCalledTimes(1)
      expect(contactSupport.forResetPasswordEmailNotReceived).toHaveBeenCalledWith(
        'john.doe@gmail.com'
      )
    })
  })

  it('should open mail app when clicking on check email button', async () => {
    const renderAPI = await renderInitialPage('ResetPasswordEmailSent')

    const checkEmailsButton = renderAPI.getByText('Consulter mes e-mails')
    fireEvent.press(checkEmailsButton)

    await waitForExpect(() => {
      expect(openInbox).toHaveBeenCalled()
    })
  })
})

const navigationRef = React.createRef<NavigationContainerRef>()

type StackParams = {
  Home: undefined
  PreviousScreen: undefined
  ResetPasswordEmailSent: { email: string }
}

const TestStack = createStackNavigator<StackParams>()

const Home = () => <Text>HomeText</Text>

const PreviousScreen = () => <Text>PreviousScreenText</Text>

async function renderInitialPage(initialScreenName: keyof StackParams) {
  const renderAPI = render(
    <NavigationContainer ref={navigationRef}>
      <TestStack.Navigator initialRouteName={initialScreenName}>
        <TestStack.Screen name="Home" component={Home} />
        <TestStack.Screen name="PreviousScreen" component={PreviousScreen} />
        <TestStack.Screen
          name="ResetPasswordEmailSent"
          component={ResetPasswordEmailSent}
          initialParams={{ email: 'john.doe@gmail.com' }}
        />
      </TestStack.Navigator>
    </NavigationContainer>
  )
  await act(async () => {
    await flushAllPromises()
  })
  return renderAPI
}
