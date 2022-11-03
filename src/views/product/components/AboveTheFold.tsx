import React from 'react'
import ProductDetails from 'src/components/sections/ProductDetails/ProductDetails'
import type { FC } from 'react'
import type { PDPProps } from 'src/pages/[slug]/p'
import type { BrowserProductQueryQuery } from '@generated/graphql'

interface Props extends PDPProps {
  product: BrowserProductQueryQuery['product']
}

const AboveTheFold: FC<Props> = ({ product }) => {
  return (
    <>
      {/*

      Sections: Components imported from '../components/sections' only.
      Do not import or render components from any other folder in here.

    */}
      <ProductDetails product={product} />
    </>
  )
}

export default AboveTheFold
