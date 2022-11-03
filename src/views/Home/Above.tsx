import type { FC } from 'react'
import React from 'react'
import RenderHomeCMS from 'src/components/RenderHomeCMS'

interface HomePage {
  data: {
    allCmsHome: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      edges: Array<{ node: { sections: Array<{ name: string; data: any }> } }>
    }
  }
}

const Above: FC<HomePage> = (props) => {
  const {
    data: { allCmsHome },
  } = props

  const { edges } = allCmsHome
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sections] = edges?.map((e: any) => e?.node?.sections)

  return (
    <section className="page__section cms-home-components">
      <RenderHomeCMS sections={sections} fold="above" />
    </section>
  )
}

export default Above
