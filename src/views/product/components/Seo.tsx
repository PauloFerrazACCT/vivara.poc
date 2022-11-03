import { useSession } from 'src/sdk/session'
import {
  BreadcrumbJsonLd,
  GatsbySeo,
  ProductJsonLd,
} from 'gatsby-plugin-next-seo'
import React from 'react'
import type { BrowserProductQueryQuery } from '@generated/graphql'
import type { FC } from 'react'
import type { PDPProps } from 'src/pages/[slug]/p'

interface Props extends PDPProps {
  product: BrowserProductQueryQuery['product']
}

const Seo: FC<Props> = (props) => {
  const { locale, currency } = useSession()
  const {
    serverData,
    data: { site },
    params: { slug },
    location: { pathname },
  } = props

  if (serverData === null) {
    return null
  }

  const { product } = serverData

  if (!product) {
    throw new Error('NotFound')
  }

  const title = product.seo.title ?? site?.siteMetadata?.title ?? ''
  const description =
    product.seo.description ?? site?.siteMetadata?.description ?? ''

  const siteUrl = site?.siteMetadata?.siteUrl
  const canonical = `${siteUrl}${pathname}`

  return (
    <>
      <GatsbySeo
        title={title}
        description={description}
        canonical={canonical}
        language={locale}
        openGraph={{
          type: 'og:product',
          url: `${site?.siteMetadata?.siteUrl}${slug}`,
          title,
          description,
          images: product.image?.map((img) => ({
            url: img.url,
            alt: img.alternateName,
          })),
        }}
        metaTags={[
          {
            property: 'product:price:amount',
            content: product.offers.lowPrice?.toString() ?? undefined,
          },
          {
            property: 'product:price:currency',
            content: currency.code,
          },
        ]}
      />
      <BreadcrumbJsonLd
        itemListElements={product.breadcrumbList.itemListElement ?? []}
      />
      <ProductJsonLd
        name={product.name}
        description={product.description}
        brand={product.brand.name}
        sku={product.sku}
        gtin={product.gtin}
        images={product.image?.map((img) => img.url)} // Somehow, Google does not understand this valid Schema.org schema, so we need to do conversions
        offersType="AggregateOffer"
        offers={{
          ...product.offers,
          price: product.offers.offers?.[0].price.toString(),
        }}
      />
    </>
  )
}

export default Seo
