import React from 'react'
import type { FC } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { useSession } from 'src/sdk/session'

interface SeoProps {
  data: {
    site: SiteProps | null | undefined
  }
  location: { pathname: string; host: string }
  cmsData: any
}

type SiteProps = {
  siteMetadata: SiteMetaData | null | undefined
}

type SiteMetaData = {
  title: string | null | undefined
  description: string | null | undefined
  titleTemplate: string | null | undefined
}

const Seo: FC<SeoProps> = (props) => {
  const {
    data: { site },
    location: { pathname, host },
    cmsData,
  } = props

  const filterTitle = cmsData?.seo?.siteMetadataWithSlug?.title
  const filterDescription = cmsData?.seo?.siteMetadataWithSlug?.description

  const { locale } = useSession()
  const title = site?.siteMetadata?.title ?? ''
  const siteUrl = `https://${host}${pathname}`
  const canonical = `${siteUrl}${pathname}`

  return (
    <>
      {/* SEO */}
      <GatsbySeo
        title={filterTitle ?? ''}
        description={filterDescription ?? ''}
        canonical={canonical}
        language={locale}
        openGraph={{
          type: 'website',
          title,
          description: site?.siteMetadata?.description ?? '',
        }}
      />
    </>
  )
}

export default Seo
