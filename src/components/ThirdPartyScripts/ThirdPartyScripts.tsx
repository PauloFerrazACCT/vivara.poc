import React from 'react'

import GoogleTagManager from './GoogleTagManager'
import MetaTag from './MetaTag'
import VTEX from './vtex'

function ThirdPartyScripts() {
  return (
    <>
      <MetaTag />
      <GoogleTagManager />
      <VTEX />
    </>
  )
}

export default ThirdPartyScripts
