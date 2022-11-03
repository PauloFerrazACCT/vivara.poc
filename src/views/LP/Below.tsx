import loadable from '@loadable/component'
import React from 'react'
import RenderLPCMS from 'src/components/RenderLPCMS'

const ProductGallery = loadable(
  () => import('src/components/sections/ProductGallery')
)

interface Props {
  cmsData: {
    sections: Array<{ name: string; data: any }>
  }
  selectedFacets: Array<{ key: string; value: string }>
  searchParams: {
    base: string
  }
  site: {
    siteMetadata: {
      title: string | null
    } | null
  } | null
}

const Below = (props: Props) => {
  const { cmsData, selectedFacets, searchParams, site } = props

  const { base } = searchParams
  const title = site?.siteMetadata?.title ?? ''

  return (
    <>
      <section className="page__section cms-departament-components">
        <RenderLPCMS sections={cmsData?.sections} fold="below" />
      </section>

      {selectedFacets.length > 0 ? (
        <>
          <ProductGallery term={null} base={base} title={title} />
        </>
      ) : null}
    </>
  )
}

export default Below
