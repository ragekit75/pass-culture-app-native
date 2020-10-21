import { render, fireEvent, waitFor } from '@testing-library/react-native'
import React from 'react'

import * as authApi from 'features/auth/api'
import { env } from 'libs/environment'
import { IUser } from 'types'

import { Home } from './Home'

jest.mock('libs/environment', () => ({
  env: {
    FEATURE_FLAG_CODE_PUSH: true,
  },
}))

describe('Home component', () => {
  const navigation = {
    navigate: jest.fn(),
  } as any // eslint-disable-line @typescript-eslint/no-explicit-any

  afterAll(() => jest.resetAllMocks())

  describe('With current user loaded', () => {
    beforeEach(() => {
      jest.spyOn(authApi, 'useCurrentUser').mockReturnValue({
        user: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@passculture.app',
        } as IUser,
      } as ReturnType<typeof authApi.useCurrentUser>)
    })

    it('should have a welcome message', async () => {
      const { getByText } = render(<Home navigation={navigation} />)

      const welcomeText = await waitFor(() => getByText('Bienvenue à Pass Culture'))
      expect(welcomeText.props.children).toBe('Bienvenue à Pass Culture')
    })

    it('should render correctly', () => {
      const home = render(<Home navigation={navigation} />)
      expect(home).toMatchSnapshot()
    })

    it('should have a button to go to login page with params', () => {
      const { getByText } = render(<Home navigation={navigation} />)
      const LoginButton = getByText('Aller sur la page de connexion avec params')
      fireEvent.press(LoginButton)
      expect(navigation.navigate).toHaveBeenCalledWith('Login', {
        userId: 'I have been Set by params',
      })
    })

    it('should not have code push button', async () => {
      env.FEATURE_FLAG_CODE_PUSH_MANUAL = false
      const home = render(<Home navigation={navigation} />)
      expect(() => home.getByText('Check update')).toThrowError()
    })
  })
  describe('Without current user', () => {
    it('should display activity indicator when loading', () => {
      jest.spyOn(authApi, 'useCurrentUser').mockReturnValue({
        isFetching: true,
      } as ReturnType<typeof authApi.useCurrentUser>)

      const { getByTestId } = render(<Home navigation={navigation} />)
      const activityIndicator = getByTestId('user-activity-indicator')
      expect(activityIndicator).toBeTruthy()
    })
    it('should not display activity indicator when not loading', () => {
      jest.spyOn(authApi, 'useCurrentUser').mockReturnValue({
        isFetching: false,
      } as ReturnType<typeof authApi.useCurrentUser>)
      const { getByTestId } = render(<Home navigation={navigation} />)
      let activityIndicator
      try {
        activityIndicator = getByTestId('user-activity-indicator')
        fail()
      } catch (error) {
        expect(activityIndicator).toBeFalsy()
      }
    })
    it('should not display user view on error', () => {
      jest.spyOn(authApi, 'useCurrentUser').mockReturnValue({
        isError: true,
      } as ReturnType<typeof authApi.useCurrentUser>)
      const { getByText } = render(<Home navigation={navigation} />)
      let refreshButton
      try {
        refreshButton = getByText("Rafraîchir les données de l'utilisateur")
        fail()
      } catch (error) {
        expect(refreshButton).toBeFalsy()
      }
    })
    it('should call refetch when the refetchbutton is clicked', () => {
      const refetch = jest.fn()
      jest.spyOn(authApi, 'useCurrentUser').mockReturnValue({
        user: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@passculture.app',
        } as IUser,
        refetch: () => refetch(),
      } as ReturnType<typeof authApi.useCurrentUser>)
      const { getByTestId } = render(<Home navigation={navigation} />)

      const refreshButton = getByTestId('refreshUserInformationsButton')
      refreshButton.props.onClick()

      expect(refetch).toBeCalled()
    })
  })
})
