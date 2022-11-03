import { useSearch } from '@faststore/sdk'
import { useSession } from 'src/sdk/session'
import { gql } from '@faststore/graphql-utils'
import { useMemo } from 'react'
import { useQuery } from 'src/sdk/graphql/useQuery'
import type {
  ProductGalleryQueryQuery as Query,
  ProductGalleryQueryQueryVariables as Variables,
} from '@generated/graphql'

/**
 * This query is run on the browser and contains
 * the current search state of the user
 */
export const query = gql`
  query ProductGalleryQuery(
    $first: Int!
    $after: String!
    $sort: StoreSort!
    $term: String!
    $selectedFacets: [IStoreSelectedFacet!]!
  ) {
    search(
      first: $first
      after: $after
      sort: $sort
      term: $term
      selectedFacets: $selectedFacets
    ) {
      products {
        pageInfo {
          totalCount
        }
        edges {
          node {
            id: productID
            slug
            sku
            brand {
              brandName: name
            }
            name
            gtin
            releaseDate
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
        }
      }
      facets {
        ...Filter_facets
      }
    }
  }
`

const toArray = <T>(x: T[] | T | undefined) =>
  Array.isArray(x) ? x : x ? [x] : []

export const useGalleryQuery = () => {
  const {
    state: { term, sort, selectedFacets, page },
    itemsPerPage,
  } = useSearch()

  const { channel } = useSession()

  if (!channel) {
    throw new Error(`useProduct: 'channel' from session is an empty string.`)
  }

  const variables = useMemo(() => {
    const facets = toArray(selectedFacets)

    return {
      first: itemsPerPage,
      after: (itemsPerPage * page).toString(),
      sort,
      term: term ?? '',
      selectedFacets: [
        ...facets,
        // eslint-disable-next-line
        { key: 'channel', value: channel },
      ],
    }
  }, [channel, itemsPerPage, page, sort, term, selectedFacets])

  return useQuery<Query, Variables>(query, variables)
}
