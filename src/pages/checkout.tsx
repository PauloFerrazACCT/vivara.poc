import React, { useEffect } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { graphql } from 'gatsby'

import storeConfig from '../../store.config'

function Page() {
  useEffect(() => {
    window.location.href = storeConfig.checkoutUrl
  }, [])

  return (
    <>
      <GatsbySeo noindex nofollow />

      <div>loading...</div>
    </>
  )
}

export const query = graphql`
  query CheckoutPageQuery {
    cmsGlobalComponents {
      sections {
        name
        data
      }
    }
  }
`

export default Page
