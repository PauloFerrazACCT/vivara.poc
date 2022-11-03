import React from 'react'
import type { FC } from 'react'
import { Link } from '@faststore/ui'

import IconVtex from '../../images/IconVtex.png'

const VtexIcon: FC = () => (
  <Link
    href="https://vtex.com/br-pt/"
    target="_blank"
    aria-label="Vtex Icon"
    title="Vtex Icon"
    rel="noopener"
  >
    <img
      src={IconVtex}
      alt="Vtex Icon"
      loading="lazy"
      width="60px"
      height="24px"
    />
  </Link>
)

export default VtexIcon
