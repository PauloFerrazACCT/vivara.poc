import { parseSearchState, SearchProvider } from '@faststore/sdk'
import { useSession } from 'src/sdk/session'
import { graphql } from 'gatsby'
import React, { useEffect, useMemo } from 'react'
import ProductGallery from 'src/components/sections/ProductGallery'
import { ITEMS_PER_PAGE } from 'src/constants'
import { applySearchState } from 'src/sdk/search/state'
import type { PageProps } from 'gatsby'
import type {
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables,
} from '@generated/graphql'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import SROnly from 'src/components/ui/SROnly'
import { mark } from 'src/sdk/tests/mark'

export type Props = PageProps<
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables
>

const useSearchParams = ({ href }: Location) =>
  useMemo(() => href && parseSearchState(new URL(href)), [href])

function Page(props: Props) {
  useEffect(() => {
    window.addEventListener('message', (message) => {
      if (message.data.name !== 'PageViewEvent') {
        return
      }

      window.postMessage({
        name: 'AnalyticsEvent',
        params: {
          name: 'store:page_view',
          params: { ...message.data.params.params, pageType: 'Search' },
        },
      })
    })
  }, [])

  const {
    data: { site, cmsHome },
  } = props

  const { locale } = useSession()
  const searchParams = useSearchParams(props.location)
  const title = 'Resultados de busca | Vivara'
  const description = 'Tornando toda história única e especial'

  if (!searchParams) {
    return null
  }

  const { term, base } = searchParams

  return (
    <SearchProvider
      onChange={applySearchState}
      itemsPerPage={ITEMS_PER_PAGE}
      {...searchParams}
    >
      {/* SEO */}
      <GatsbySeo
        noindex
        language={locale}
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          title,
          description: site?.siteMetadata?.description ?? '',
        }}
      />

      {/*
        Sections: Components imported from '../components/sections' only.
        Do not import or render components from any other folder in here.
      */}
      <SROnly as="h1" text={title} />

      <ProductGallery
        title="Search Results"
        cmsHome={cmsHome}
        term={term}
        base={base}
      />
    </SearchProvider>
  )
}

export const query = graphql`
  query SearchPageQuery {
    site {
      siteMetadata {
        titleTemplate
        title
        description
      }
    }
    cmsHome {
      sections {
        name
        data
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
