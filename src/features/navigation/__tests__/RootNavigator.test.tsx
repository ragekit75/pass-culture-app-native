import { act, render } from '@testing-library/react-native'
import React from 'react'
import { Text as mockText } from 'react-native'
import CodePush from 'react-native-code-push'
import SplashScreen from 'react-native-splash-screen'

import { AcceptCgu } from 'features/auth/signup/AcceptCgu'
import { AccountCreated } from 'features/auth/signup/AccountCreated'
import { useCodePush } from 'libs/codepush/CodePushProvider'
import { DEFAULT_SPLASHSCREEN_DELAY } from 'libs/splashscreen'
import { storage } from 'libs/storage'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { flushAllPromises } from 'tests/utils'

import { RootNavigator, Route, wrapRoute } from '../RootNavigator'
import { useGetInitialRouteName } from '../RootNavigator/useGetInitialRouteName'

const mockedUseGetInitialRouteName = useGetInitialRouteName as jest.MockedFunction<
  typeof useGetInitialRouteName
>
jest.mock('../RootNavigator/useGetInitialRouteName', () => ({
  useGetInitialRouteName: jest.fn().mockReturnValue('TabNavigator'),
}))
jest.mock('@react-navigation/native', () => jest.requireActual('@react-navigation/native'))
jest.mock('features/auth/AuthContext', () => ({
  useAuthContext: jest.fn(() => ({ isLoggedIn: true })),
}))
jest.mock('react-error-boundary', () => ({
  withErrorBoundary: (component: React.ReactNode, _: unknown) => component,
}))
jest.mock('features/navigation/TabBar/TabNavigator', () => ({
  TabNavigator() {
    const Text = mockText
    return <Text>TabNavigator screen</Text>
  },
}))
jest.mock('features/firstTutorial/pages/FirstTutorial/FirstTutorial', () => ({
  FirstTutorial() {
    const Text = mockText
    return <Text>FirstTutorial screen</Text>
  },
}))

const mockedUseCodePush = useCodePush as jest.MockedFunction<typeof useCodePush>
mockedUseCodePush.mockReturnValue({ status: CodePush.SyncStatus.UP_TO_DATE })
jest.mock('libs/codepush/CodePushProvider', () => ({
  useCodePush: jest.fn(),
}))

describe('<RootNavigator />', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
    storage.clear('has_seen_tutorials')
  })

  it('show initial screen given by useGetInitialRouteName()', async () => {
    mockedUseGetInitialRouteName.mockReturnValueOnce('TabNavigator')
    let renderAPI = render(reactQueryProviderHOC(<RootNavigator />))
    await act(flushAllPromises)

    expect(renderAPI.queryByText('TabNavigator screen')).toBeTruthy()
    renderAPI.unmount()

    mockedUseGetInitialRouteName.mockReturnValueOnce('FirstTutorial')
    renderAPI = render(reactQueryProviderHOC(<RootNavigator />))
    await act(flushAllPromises)

    expect(renderAPI.queryByText('FirstTutorial screen')).toBeTruthy()
    renderAPI.unmount()
  })

  it('should call SplashScreen.hide() after 200ms', async () => {
    expect.assertions(2)
    const renderAPI = render(reactQueryProviderHOC(<RootNavigator />))
    await act(flushAllPromises)

    expect(SplashScreen.hide).toBeCalledTimes(0)

    await waitForSplashScreenDelay()

    expect(SplashScreen.hide).toBeCalledTimes(1)
    renderAPI.unmount()
  })

  it('should NOT display PrivacyPolicy if splash screen is not yet hidden', async () => {
    expect.assertions(2)
    const renderAPI = render(reactQueryProviderHOC(<RootNavigator />))
    await act(flushAllPromises)

    expect(SplashScreen.hide).toBeCalledTimes(0)
    const privacyPolicyTitle = renderAPI.queryByText('Respect de ta vie privée')
    expect(privacyPolicyTitle).toBeFalsy()
    renderAPI.unmount()
  })

  it('should display PrivacyPolicy if splash screen is hidden', async () => {
    expect.assertions(2)
    const renderAPI = render(reactQueryProviderHOC(<RootNavigator />))
    await act(flushAllPromises)

    await waitForSplashScreenDelay()

    expect(SplashScreen.hide).toBeCalledTimes(1)
    const privacyPolicyTitle = renderAPI.queryByText('Respect de ta vie privée')
    expect(privacyPolicyTitle).toBeTruthy()
    renderAPI.unmount()
  })

  it('should NOT call SplashScreen.hide() if CodePush status is not UP_TO_DATE', async () => {
    mockedUseCodePush.mockReturnValue({ status: CodePush.SyncStatus.CHECKING_FOR_UPDATE })
    const renderAPI = render(reactQueryProviderHOC(<RootNavigator />))
    await act(flushAllPromises)

    expect(SplashScreen.hide).not.toBeCalled()

    await waitForSplashScreenDelay()

    expect(SplashScreen.hide).not.toBeCalled()
    renderAPI.unmount()
  })
})

describe('wrapRoute()', () => {
  const hoc = jest.fn()

  beforeEach(() => {
    hoc.mockClear()
  })

  it('should wrap a route when declared with hocs wrapper', () => {
    const routeWithHoc: Route = {
      name: 'AcceptCgu',
      component: AcceptCgu,
      hoc,
    }
    wrapRoute(routeWithHoc)
    expect(hoc).toBeCalledWith(AcceptCgu)
  })

  it('should not wrap a route when not declared with hocs wrapper', () => {
    const routeWithoutHoc: Route = {
      name: 'AccountCreated',
      component: AccountCreated,
    }
    wrapRoute(routeWithoutHoc)
    expect(hoc).not.toBeCalledWith(AccountCreated)
  })
})

async function waitForSplashScreenDelay() {
  act(() => {
    jest.advanceTimersByTime(DEFAULT_SPLASHSCREEN_DELAY)
  })
  await act(flushAllPromises)
}
