import type { BrowserProductQueryQuery } from '@generated/graphql'
import type { FC } from 'react'
import React from 'react'
import AnchorMenu from 'src/components/sections/ProductDescription/AnchorMenu'
import type { PDPProps } from 'src/pages/[slug]/p'

interface Props extends PDPProps {
  product: BrowserProductQueryQuery['product']
}

const BelowTheFold: FC<Props> = ({ product }) => {
  return (
    <section className="page__section page__section-shelf page__section-divisor / grid-section">
      <AnchorMenu product={product} />
    </section>
  )
}

export default BelowTheFold
