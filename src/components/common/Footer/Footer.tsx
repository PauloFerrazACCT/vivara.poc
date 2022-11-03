import React from 'react'

import AboveFooter from './AboveFooter'
import BelowFooter from './BelowFooter'

interface Props {
  hideAboveFooter: boolean | undefined
}

const Footer = ({ hideAboveFooter }: Props) => {
  return (
    <>
      <AboveFooter hideAboveFooter={hideAboveFooter} />

      <BelowFooter />
    </>
  )
}

export default Footer
