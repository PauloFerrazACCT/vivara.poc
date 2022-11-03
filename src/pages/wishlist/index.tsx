import React, { useEffect } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import WishlistPage from 'src/views/wishlist'
import { graphql } from 'gatsby'

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
          params: { ...message.data.params.params, pageType: 'Outros' },
        },
      })
    })
  }, [])

  return (
    <>
      <GatsbySeo
        title="Wishlist"
        description="Wishlist Page"
        language="pt-BR"
        noindex
        nofollow
      />
      <WishlistPage />
    </>
  )
}

export const query = graphql`
  query WishlistPageQuery {
    cmsGlobalComponents {
      sections {
        name
        data
      }
    }
  }
`

export default Page
