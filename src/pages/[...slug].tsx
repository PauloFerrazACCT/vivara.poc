import { SearchProvider } from '@faststore/sdk'
import { useSession } from 'src/sdk/session'
import { graphql } from 'gatsby'
import { BreadcrumbJsonLd, GatsbySeo } from 'gatsby-plugin-next-seo'
import React, { useEffect, useState } from 'react'
import { gql } from '@faststore/graphql-utils'
import ProductGallery from 'src/components/sections/ProductGallery'
import { ITEMS_PER_PAGE } from 'src/constants'
import { useSearchParams } from 'src/hooks/useSearchParams'
import { applySearchState } from 'src/sdk/search/state'
import { mark } from 'src/sdk/tests/mark'
import type { Props } from 'src/hooks/useSearchParams'
import RenderCMS from 'src/components/RenderCMS'
import '../styles/pages/product-listing-page.scss'
import '../styles/pages/departament.scss'

function Page(props: Props) {
  useEffect(() => {
    let countListeneredEvent = 0

    window.addEventListener('message', (message) => {
      if (message.data.name !== 'PageViewEvent') {
        return
      }

      if (countListeneredEvent === 0) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    data: { site, cmsHome, allCmsPlp },
    serverData,
    location: { pathname },
    slug,
  } = props

  const [dynamicTitle, setDynamicTitle] = useState('')

  useEffect(() => {
    if (slug) {
      const slugArray = slug?.split('/')

      setDynamicTitle(slugArray[slugArray?.length - 1])
    }
  }, [slug])

  const { locale } = useSession()
  const searchParams = useSearchParams(props)

  if (serverData === null) {
    return null
  }

  const { collection } = serverData

  const { base } = searchParams
  const title = collection?.seo.title ?? site?.siteMetadata?.title ?? ''
  const description =
    collection?.seo.description ?? site?.siteMetadata?.description ?? ''

  const siteUrl = site?.siteMetadata?.siteUrl
  const canonical = `${siteUrl}${pathname}`

  const { edges } = allCmsPlp

  const [sections] = edges?.map((e: any) => e?.node?.sections)

  return (
    <SearchProvider
      onChange={applySearchState}
      itemsPerPage={ITEMS_PER_PAGE}
      {...searchParams}
    >
      {/* SEO */}
      <GatsbySeo
        title={title}
        titleTemplate={site?.siteMetadata?.titleTemplate ?? ''}
        description={description}
        canonical={canonical}
        language={locale}
        openGraph={{
          type: 'website',
          title,
          description: site?.siteMetadata?.description ?? '',
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={collection?.breadcrumbList.itemListElement ?? []}
      />

      {/*
      Sections: Components imported from '../components/sections' only.
      Do not import or render components from any other folder in here.
    */}

      {dynamicTitle && (
        <div className="page-title__background">
          <div className='"page__section page-title__content'>
            <h1 className="page-title__text">
              {dynamicTitle.replace(/-/g, ' ')}
            </h1>
          </div>
        </div>
      )}

      <section className="page__section cms-departament-components">
        <RenderCMS sections={sections} />
      </section>

      <ProductGallery term={null} base={base} title={title} cmsHome={cmsHome} />
    </SearchProvider>
  )
}

/**
 * This query is run during SSG
 * */

export const querySSG = graphql`
  query CollectionPageQuery {
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

    allCmsPlp {
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

export const querySSR = gql`
  query ServerCollectionPageQuery($slug: String!) {
    collection(slug: $slug) {
      seo {
        title
        description
      }
      breadcrumbList {
        itemListElement {
          item
          name
          position
        }
      }
      meta {
        selectedFacets {
          key
          value
        }
      }
    }

    cmsHome {
      sections {
        name
        data
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
  const { execute } = await import('src/server/index')
  const { data, errors = [] } = await execute({
    operationName: querySSR,
    variables: { slug },
  })

  const notFound = errors.find(isNotFoundError)

  if (data === null || notFound) {
    const params = new URLSearchParams({
      from: encodeURIComponent(`/${slug}`),
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

  if (errors && errors?.length > 0) {
    throw new Error(`${errors[0]}`)
  }

  return {
    status: 200,
    props: data ?? {},
    headers: {
      'cache-control': ONE_YEAR_CACHE,
    },
  }
}

Page.displayName = 'Page'
export default mark(Page)
