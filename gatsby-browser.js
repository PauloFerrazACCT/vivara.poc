import './src/styles/fonts.scss'
import './src/styles/theme.scss'
import './src/styles/layout.scss'

import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'

import UIProvider from 'src/sdk/ui/Provider'
import React from 'react'

import Layout from './src/Layout'
import AnalyticsHandler from './src/sdk/analytics'
import ErrorBoundary from './src/sdk/error/ErrorBoundary'
import TestProvider from './src/sdk/tests'
import { WishlistProvider } from './src/contexts/wishlist-context'
import { NotificationProvider } from './src/contexts/notification-context'
import { UserProvider } from './src/contexts/user-context'
import { MeasureProvider } from './src/contexts/measure-context'

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

export const onRouteUpdate = ({ location, prevLocation }) => {
  const visitorId = sessionStorage.getItem('visitorId')

  window.postMessage({
    name: 'PageViewEvent',
    params: {
      name: 'store:page_view',
      params: {
        visitorId,
        location: location.href,
        page: location.pathname,
        referrer: prevLocation ? prevLocation.href : null,
      },
    },
  })
}
