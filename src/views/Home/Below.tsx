import loadable from '@loadable/component'
import type { FC } from 'react'
import React from 'react'
import RenderHomeCMS from 'src/components/RenderHomeCMS'

const AdvantageRuler = loadable(
  () => import('src/components/sections/AdvantageRuler')
)

interface HomePage {
  data: {
    allCmsHome: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      edges: Array<{ node: { sections: Array<{ name: string; data: any }> } }>
    }
  }
}

const Below: FC<HomePage> = (props) => {
  const {
    data: { allCmsHome },
  } = props

  const { edges } = allCmsHome
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sections] = edges?.map((e: any) => e?.node?.sections)

  return (
    <>
      <section className="page__section cms-home-components">
        <RenderHomeCMS sections={sections} fold="below" />
      </section>
      <section className="page__section">
        <AdvantageRuler />
      </section>
    </>
  )
}

export default Below
