/* eslint-disable react/jsx-filename-extension */
import UIProvider from 'src/sdk/ui/Provider'
import React from 'react'

import ThirdPartyScripts from './src/components/ThirdPartyScripts'
import Layout from './src/Layout'
import AnalyticsHandler from './src/sdk/analytics'
import ErrorBoundary from './src/sdk/error/ErrorBoundary'
import TestProvider from './src/sdk/tests'
import { MeasureProvider } from './src/contexts/measure-context'
import { WishlistProvider } from './src/contexts/wishlist-context'
import { NotificationProvider } from './src/contexts/notification-context'
import { UserProvider } from './src/contexts/user-context'

export const wrapRootElement = ({ element }) => (
  <ErrorBoundary>
    <AnalyticsHandler />
    <TestProvider>
      <UIProvider>
        <UserProvider>
          <NotificationProvider>
            <WishlistProvider>
              <MeasureProvider>{element}</MeasureProvider>
            </WishlistProvider>
          </NotificationProvider>
        </UserProvider>
      </UIProvider>
    </TestProvider>
  </ErrorBoundary>
)

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([<ThirdPartyScripts key="ThirdPartyScripts" />])
}

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents()

  const orderedComponents = headComponents.sort((item) => {
    const isGlobalStyle =
      item.type === 'style' &&
      item.props['data-href'] &&
      /^\/styles.[a-zA-Z0-9]*.css$/.test(item.props['data-href'])

    return isGlobalStyle ? -1 : 1
  })

  replaceHeadComponents(orderedComponents)
}
