import { I18nProvider } from '@lingui/react'
import React, { FunctionComponent } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import 'react-native-gesture-handler' // @react-navigation
import 'react-native-get-random-values' // required for `uuid` module to work
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { addPlugin } from 'react-query-native-devtools'

import './why-did-you-render'

import { AuthWrapper } from 'features/auth/AuthContext'
import { AsyncErrorBoundaryWithoutNavigation } from 'features/errors/pages/AsyncErrorBoundary'
import { RootNavigator } from 'features/navigation/RootNavigator'
import { SearchWrapper } from 'features/search/pages/SearchWrapper'
import CodePushProvider from 'libs/codepush/CodePushProvider'
import { errorMonitoring } from 'libs/errorMonitoring'
import { GeolocationWrapper } from 'libs/geolocation'
import { i18n } from 'libs/i18n' //@translations
import { useStartBatchNotification } from 'libs/notifications'
import { SnackBarProvider } from 'ui/components/snackBar/SnackBarContext'

const queryCache = new QueryCache()

if (__DEV__ && process.env.JEST !== 'true') {
  addPlugin(queryCache)
}
const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      retry: 0,
      useErrorBoundary: true,
    },
  },
})

// Disable error monitoring in development environment
errorMonitoring.init({ enabled: !__DEV__ })

const App: FunctionComponent = function () {
  useStartBatchNotification()

  return (
    <CodePushProvider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary FallbackComponent={AsyncErrorBoundaryWithoutNavigation}>
            <GeolocationWrapper>
              <AuthWrapper>
                <SearchWrapper>
                  <I18nProvider language={i18n.language} i18n={i18n}>
                    <SnackBarProvider>
                      <RootNavigator />
                    </SnackBarProvider>
                  </I18nProvider>
                </SearchWrapper>
              </AuthWrapper>
            </GeolocationWrapper>
          </ErrorBoundary>
        </QueryClientProvider>
      </SafeAreaProvider>
    </CodePushProvider>
  )
}

export { App }
