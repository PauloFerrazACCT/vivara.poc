import React, { useEffect } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import ListPage from 'src/views/wishlist/list'
import { graphql } from 'gatsby'

function Page({ location }: any) {
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
      <ListPage list={location?.state?.list} />
    </>
  )
}

export const query = graphql`
  query WishlistListPageQuery {
    cmsGlobalComponents {
      sections {
        name
        data
      }
    }
  }
`

export default Page
