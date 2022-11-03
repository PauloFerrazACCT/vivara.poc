import { useSession } from 'src/sdk/session'
import { useMemo } from 'react'
import type {
  BrowserProductQueryQuery,
  BrowserProductQueryQueryVariables,
} from '@generated/graphql'
import { gql } from '@faststore/graphql-utils'

import { useQuery } from '../graphql/useQuery'

const query = gql`
  query BrowserProductQuery($locator: [IStoreSelectedFacet!]!) {
    product(locator: $locator) {
      id: productID
      sku
      releaseDate
      name
      gtin
      description
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
          seller {
            identifier
          }
        }
      }

      breadcrumbList {
        itemListElement {
          item
          name
          position
        }
      }
    }
  }
`

export const skuFragment = gql`
  fragment skuFragment on StoreProduct {
    sku
    name
    description
    offers {
      lowPrice
      offers {
        availability
        price
        listPrice
        seller {
          identifier
        }
      }
    }
    additionalProperty {
      propertyID
      name
      value
      valueReference
    }
  }
`

export const useProduct = <T extends BrowserProductQueryQuery>(
  productID: string,
  fallbackData?: T
) => {
  const { channel } = useSession()

  if (!channel) {
    throw new Error(`useProduct: 'channel' from session is an empty string.`)
  }

  const variables = useMemo(() => {
    if (!channel) {
      throw new Error(`useProduct: 'channel' from session is 'null'.`)
    }

    return {
      locator: [
        { key: 'id', value: productID },
        { key: 'channel', value: channel },
      ],
    }
  }, [channel, productID])

  return useQuery<BrowserProductQueryQuery, BrowserProductQueryQueryVariables>(
    query,
    variables,
    {
      fallbackData,
      revalidateOnMount: true,
    }
  )
}
