import React from 'react'
import type { FC } from 'react'
import { GatsbySeo, JsonLd } from 'gatsby-plugin-next-seo'
import { useSession } from 'src/sdk/session'

interface SeoProps {
  data: {
    site:
      | {
          siteMetadata:
            | {
                title: string | null | undefined
                description: string | null | undefined
                titleTemplate: string | null | undefined
              }
            | null
            | undefined
        }
      | null
      | undefined
  }
  location: { pathname: string; host: string }
}

const Seo: FC<SeoProps> = (props) => {
  const {
    data: { site },
    location: { pathname, host },
  } = props

  const { locale } = useSession()
  const title = site?.siteMetadata?.title ?? ''
  const siteUrl = `https://${host}${pathname}`

  return (
    <>
      {/* SEO */}
      <GatsbySeo
        title={title}
        description={site?.siteMetadata?.description ?? ''}
        titleTemplate={site?.siteMetadata?.titleTemplate ?? ''}
        language={locale}
        canonical={siteUrl}
        openGraph={{
          type: 'website',
          url: siteUrl,
          title: title ?? '',
          description: site?.siteMetadata?.description ?? '',
        }}
      />
      <JsonLd
        json={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: siteUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/s/?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />
    </>
  )
}

export default Seo
