import type { SearchState } from '@faststore/sdk'
import { parseSearchState, SearchProvider } from '@faststore/sdk'
import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import React, { useEffect, useMemo, useState } from 'react'
import { ITEMS_PER_PAGE } from 'src/constants'
import { applySearchState } from 'src/sdk/search/state'
import Seo from 'src/views/LP/Seo'
import Above from 'src/views/LP/Above'
import Below from 'src/views/LP/Below'
import 'src/styles/pages/product-listing-page.scss'
import 'src/styles/pages/lp.scss'
import type {
  LandingPageQueryQuery,
  LandingPageQueryQueryVariables,
} from '@generated/graphql'
import type { SearchSort } from '@faststore/sdk/dist/types'

type Props = PageProps<
  LandingPageQueryQuery,
  LandingPageQueryQueryVariables,
  unknown
> & { slug: string; sort?: string }

const useSearchParams = (props: Props, facets?: any): SearchState => {
  const {
    location: { href, pathname, search },
    data: {
      allCmsInstitutionalPage: { edges },
    },
  } = props

  const selectedFacets = facets

  const filterSort = edges.filter((edge) => {
    const slug = edge?.node?.config?.slugAndFilterConfig?.slug
    const validatedPathname =
      pathname?.slice(-1) === '/' ? pathname?.slice(0, -1) : pathname

    return slug === validatedPathname
  })

  const sort: string = filterSort[0]?.node?.config?.slugAndFilterConfig?.sort
    ? filterSort[0]?.node?.config?.slugAndFilterConfig?.sort
    : 'score_desc'

  return useMemo(() => {
    const maybeState = href ? parseSearchState(new URL(href)) : null
    const searchSort = search.length === 0 ? sort : maybeState?.sort

    return {
      page: maybeState?.page ?? 0,
      base: maybeState?.base ?? pathname,
      selectedFacets:
        maybeState && maybeState.selectedFacets.length > 0
          ? maybeState.selectedFacets
          : selectedFacets ?? [],
      term: maybeState?.term ?? null,
      sort: (searchSort as SearchSort) ?? 'score_desc',
    }
  }, [href, pathname, selectedFacets, search, sort])
}

function convertFacets(facet: string | undefined | null, index: number) {
  let keyFacet = facet?.replace(' ', '-').toLocaleLowerCase() ?? ''

  if (facet === 'categoria') {
    keyFacet = `category-${index + 1}`
  }

  return keyFacet
}

function Page(props: Props) {
  const [didMount, setDidMount] = useState(false)

  useEffect(() => {
    setDidMount(true)
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
            params: { ...message.data.params.params, pageType: 'Category' },
          },
        })
      }
    })
  }, [])

  const {
    data: { site, allCmsInstitutionalPage },
  } = props

  const { edges } = allCmsInstitutionalPage

  const [cmsData] = edges
    .filter(
      (item) => item?.node?.config?.slugAndFilterConfig?.slug === props.path
    )
    ?.map((e) => e?.node)

  const selectedFacets: Array<{ key: string; value: string }> = []
  const filterCMS = cmsData?.config?.slugAndFilterConfig?.filterGroup?.allItems

  if (filterCMS && filterCMS?.length > 0) {
    cmsData?.config?.slugAndFilterConfig?.filterGroup?.allItems?.map(
      (item, index) =>
        selectedFacets.push({
          key: convertFacets(
            item?.key
              ?.normalize('NFD')
              /* eslint-disable-next-line */
              .replace(/[\u0300-\u036f\ ]/g, '')
              .toLowerCase(),
            index
          ),
          value:
            item?.value
              ?.replaceAll(' ', '-')
              .replaceAll('+', '-')
              .replaceAll('&', '-')
              .toLocaleLowerCase() ?? '',
        })
    )
  }

  const searchParams = useSearchParams(props, selectedFacets)

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())

    if (params?.facets?.length) {
      document.getElementById('productgrid')?.scrollIntoView()
    }
  }, [selectedFacets])

  return (
    didMount && (
      <SearchProvider
        onChange={applySearchState}
        itemsPerPage={ITEMS_PER_PAGE}
        {...searchParams}
      >
        {/* SEO */}
        <Seo data={props.data} location={props.location} cmsData={cmsData} />
        <Above cmsData={cmsData} />
        <Below
          cmsData={cmsData}
          selectedFacets={selectedFacets}
          searchParams={searchParams}
          site={site}
        />
      </SearchProvider>
    )
  )
}

/**
 * This query is run during SSG
 * */
export const querySSG = graphql`
  query LandingPageQuery {
    site {
      siteMetadata {
        titleTemplate
        title
        description
        siteUrl
      }
    }
    cmsHome {
      sections {
        name
        data
      }
    }
    allCmsInstitutionalPage {
      edges {
        node {
          name
          sections {
            data
            name
          }
          seo {
            siteMetadataWithSlug {
              slug
              description
              title
              titleTemplate
            }
          }
          config {
            slugAndFilterConfig {
              slug
              sort
              filterGroup {
                allItems {
                  key
                  value
                }
              }
            }
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

export default Page
