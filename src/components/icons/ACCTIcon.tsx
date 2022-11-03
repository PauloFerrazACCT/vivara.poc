import { Link } from '@faststore/ui'
import React from 'react'

import ACCT from '../../images/ACCT.png'

const ACCTIcon = () => {
  return (
    <Link
      href="https://acct.global/"
      aria-label="ACCT website"
      target="_blank"
      rel="noopener"
    >
      <img
        src={ACCT}
        alt="ACCT Logo"
        loading="lazy"
        width="50px"
        height="20px"
      />
    </Link>
  )
}

export default ACCTIcon
