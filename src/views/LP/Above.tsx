import type { FC } from 'react'
import React from 'react'
import RenderLPCMS from 'src/components/RenderLPCMS'

interface HomePage {
  cmsData: {
    sections: Array<{ name: string; data: any }>
  }
}

const Above: FC<HomePage> = (props) => {
  const { cmsData } = props

  return (
    <section className="page__section cms-departament-components">
      <RenderLPCMS sections={cmsData?.sections} fold="above" />
    </section>
  )
}

export default Above
