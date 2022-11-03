import React, { useMemo } from 'react'
import { parseSearchState, SearchProvider } from '@faststore/sdk'
import { useSession } from 'src/sdk/session'
import { graphql } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { mark } from 'src/sdk/tests/mark'
import ProductGallery from 'src/components/sections/ProductGallery'
import { ITEMS_PER_PAGE } from 'src/constants'
import { applySearchState } from 'src/sdk/search/state'
import type { SearchState } from '@faststore/sdk'
import type { Props } from 'src/hooks/useSearchParams'

function Page(props: Props) {
  const {
    data: { site },
    location: { href, pathname },
    data: { allDynamicCollections },
    path,
  } = props

  const useSearchParams = (facets?: any): SearchState => {
    const selectedFacets = facets

    return useMemo(() => {
      const maybeState = href ? parseSearchState(new URL(href)) : null

      return {
        page: maybeState?.page ?? 0,
        base: maybeState?.base ?? pathname,
        selectedFacets:
          maybeState && maybeState.selectedFacets.length > 0
            ? maybeState.selectedFacets
            : selectedFacets ?? [],
        term: maybeState?.term ?? null,
        sort: maybeState?.sort ?? 'score_desc',
      }
    }, [href, pathname, selectedFacets])
  }

  const { nodes } = allDynamicCollections

  const collection = nodes.filter(
    (item: any) => item.slug === path.split('/').pop()
  )

  const idCollection = collection[0]?.idCollection
  const title = collection[0]?.title ? collection[0]?.title : ''
  const selectedFacets = [
    {
      key: 'productClusterIds',
      value: idCollection ? String(idCollection) : '',
    },
  ]

  const searchParams = useSearchParams(selectedFacets)
  const { base } = searchParams
  const description = site?.siteMetadata?.description
    ? site?.siteMetadata?.description
    : ''

  const siteUrl = site?.siteMetadata?.siteUrl
  const canonical = `${siteUrl}${pathname}`
  const { locale } = useSession()

  return (
    <SearchProvider
      onChange={applySearchState}
      itemsPerPage={ITEMS_PER_PAGE}
      {...searchParams}
    >
      {/* SEO */}
      <GatsbySeo
        title={title}
        description={description}
        canonical={canonical}
        language={locale}
        openGraph={{
          type: 'website',
          title,
          description,
        }}
      />

      {selectedFacets.length > 0 ? (
        <>
          <ProductGallery term={null} base={base} title={title} />
        </>
      ) : null}
    </SearchProvider>
  )
}

/**
 * This query is run during SSG
 * */
export const querySSG = graphql`
  query CollectionDynamicPageQuery {
    site {
      siteMetadata {
        title
        description
        titleTemplate
        siteUrl
      }
    }
    allDynamicCollections {
      nodes {
        slug
        title
        idCollection
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

Page.displayName = 'Page'
export default mark(Page)
