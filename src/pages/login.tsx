import React, { useEffect } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { graphql } from 'gatsby'

import storeConfig from '../../store.config'

function Page() {
  useEffect(() => {
    window.addEventListener('message', (message) => {
      if (message.data.name !== 'PageViewEvent') {
        return
      }

      window.postMessage({
        name: 'AnalyticsEvent',
        params: {
          name: 'store:page_view',
          params: { ...message.data.params.params, pageType: 'Login' },
        },
      })
    })
  }, [])

  useEffect(() => {
    window.location.href = storeConfig.loginUrl
  }, [])

  return (
    <>
      <GatsbySeo noindex nofollow />

      <div>loading...</div>
    </>
  )
}

export const query = graphql`
  query LoginPageQuery {
    cmsGlobalComponents {
      sections {
        name
        data
      }
    }
  }
`

export default Page
