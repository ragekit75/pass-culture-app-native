import { isTimestampExpired } from 'libs/dates'

import { DeepLinksToScreenConfiguration } from './types'

export const DEEPLINK_TO_SCREEN_CONFIGURATION: DeepLinksToScreenConfiguration = {
  default: function () {
    return { screen: 'Home', params: { shouldDisplayLoginModal: false } }
  },
  favoris: function () {
    return { screen: 'Favorites', params: undefined }
  },
  login: function () {
    return { screen: 'Login', params: undefined }
  },
  'mot-de-passe-perdu': function (params) {
    if (params && params.token && params.email && params.expiration_timestamp) {
      const parsedExpirationTimestamp = Number(params.expiration_timestamp)
      if (isTimestampExpired(parsedExpirationTimestamp)) {
        return {
          screen: 'ResetPasswordExpiredLink',
          params: { email: params.email },
        }
      }
      return {
        screen: 'ReinitializePassword',
        params: {
          token: params.token,
          expiration_timestamp: parsedExpirationTimestamp,
        },
      }
    }
    return { screen: 'Home', params: { shouldDisplayLoginModal: false } }
  },
  profil: function () {
    return { screen: 'Profile', params: undefined }
  },
  recherche: function () {
    return { screen: 'Search', params: undefined }
  },
}