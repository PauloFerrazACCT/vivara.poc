import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import { mark } from 'src/sdk/tests/mark'
import type { PageProps } from 'gatsby'
import type { HomePageQueryQuery } from '@generated/graphql'
import Seo from 'src/views/Home/Seo'
import Above from 'src/views/Home/Above'
import Below from 'src/views/Home/Below'

import '../styles/pages/index.scss'

export type Props = PageProps<HomePageQueryQuery>
function Page(props: Props) {
  useEffect(() => {
    window.addEventListener('message', (message) => {
      if (
        message.data.name !== 'PageViewEvent' ||
        message.data.params.params.page !== '/'
      ) {
        return
      }

      window.postMessage({
        name: 'AnalyticsEvent',
        params: {
          name: 'store:page_view',
          params: { ...message.data.params.params, pageType: 'Home' },
        },
      })
    })
  }, [])

  return (
    <>
      <Seo data={props.data} location={props.location} />
      <Above data={props.data} />
      <Below data={props.data} />
    </>
  )
}

export const querySSG = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
        description
        titleTemplate
        siteUrl
      }
    }
    allCmsHome {
      edges {
        node {
          sections {
            name
            data
          }
        }
      }
    }
    cmsGlobalComponents {
      sections {
        name
        data
      }
    }
  }
`
export const fragment = graphql`
  fragment ProductSummary_product on StoreProduct {
    id: productID
    slug
    sku
    releaseDate
    brand {
      brandName: name
    }
    name
    gtin
    isVariantOf {
      name
      productGroupID
      additionalProperty {
        propertyID
        name
        value
        valueReference
      }
      hasVariant {
        ...skuFragment
      }
    }
    additionalProperty {
      propertyID
      name
      value
      valueReference
    }
    image {
      url
      alternateName
    }
    brand {
      name
    }
    offers {
      lowPrice
      offers {
        availability
        price
        listPrice
        quantity
        seller {
          identifier
        }
      }
    }
  }
`
Page.displayName = 'Page'
export default mark(Page)
