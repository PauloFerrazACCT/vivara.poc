import { gql } from '@faststore/graphql-utils'
import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import { mark } from 'src/sdk/tests/mark'
import type { PageProps } from 'gatsby'
import type {
  ProductPageQueryQuery,
  ServerProductPageQueryQuery,
  ProductPageQueryQueryVariables,
} from '@generated/graphql'
import ProductView from 'src/views/product'

export type PDPProps = PageProps<
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables,
  unknown,
  ServerProductPageQueryQuery | null
> & { slug: string }

function Page(props: PDPProps) {
  useEffect(() => {
    let countListeneredEvent = 0

    window.addEventListener('message', (message) => {
      if (message.data.name !== 'PageViewEvent') {
        return
      }

      if (countListeneredEvent === 0) {
        countListeneredEvent = 1

        window.postMessage({
          name: 'AnalyticsEvent',
          params: {
            name: 'store:page_view',
            params: { ...message.data.params.params, pageType: 'Produto' },
          },
        })
      }
    })
  }, [])

  if (props.serverData == null) {
    return null
  }

  return props?.serverData && <ProductView {...props} />
}

export const querySSG = graphql`
  query ProductPageQuery {
    site {
      siteMetadata {
        title
        description
        titleTemplate
        siteUrl
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

export const querySSR = gql`
  query ServerProductPageQuery($slug: String!) {
    product(locator: [{ key: "slug", value: $slug }]) {
      id: productID
      slug
      releaseDate
      seo {
        title
        description
      }
      brand {
        name
      }
      slug
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
      sku
      gtin
      name
      description
      breadcrumbList {
        itemListElement {
          item
          name
          position
        }
      }
      image {
        url
        alternateName
      }
      offers {
        lowPrice
        highPrice
        priceCurrency
        offers {
          availability
          price
          listPrice
          priceValidUntil
          priceCurrency
          itemCondition
          seller {
            identifier
          }
        }
      }
    }
  }
`

export const getServerData = async ({
  params: { slug },
}: {
  params: Record<string, string>
}) => {
  const ONE_YEAR_CACHE = `s-maxage=31536000, stale-while-revalidate`

  const { isNotFoundError } = await import('@faststore/api')
  const { execute } = await import('src/server')
  const { data, errors = [] } = await execute({
    operationName: querySSR,
    variables: { slug },
  })

  const notFound = errors.find(isNotFoundError)

  if (notFound) {
    const params = new URLSearchParams({
      from: encodeURIComponent(`/${slug}/p`),
    })

    return {
      status: 301,
      props: null,
      headers: {
        'cache-control': ONE_YEAR_CACHE,
        location: `/404/?${params.toString()}}`,
      },
    }
  }

  if (errors.length > 0) {
    throw errors[0]
  }

  return {
    status: 200,
    props: data,
    headers: {
      'cache-control': ONE_YEAR_CACHE,
    },
  }
}

Page.displayName = 'Page'

export default mark(Page)
