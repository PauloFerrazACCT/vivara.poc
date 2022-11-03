import React from 'react'
import type { FC } from 'react'
import { Link } from '@faststore/ui'

import ReclameAqui from '../../images/ReclameAqui.png'

const RAIcon: FC = () => (
  <Link
    href="https://vtex.com/br-pt/"
    target="_blank"
    aria-label="Reclame Aqui"
    title="Reclame Aqui"
    rel="noopener"
  >
    <img
      src={ReclameAqui}
      alt="Reclame Aqui Icon"
      loading="lazy"
      width="100%"
      height="auto"
    />
  </Link>
)

export default RAIcon
