import React from 'react'
import type { FC } from 'react'
import { Link } from '@faststore/ui'

import GoogleSafe from '../../images/GoogleSafe.png'

const GoogleSafeIcon: FC = () => (
  <Link
    href="https://transparencyreport.google.com/safe-browsing/search?url=http:%2F%2Fwww.vivara.com.br%2F&hl=pt-BR&gl=br&authuser=0"
    target="_blank"
    aria-label="Google Safe"
    title="Google Safe"
    rel="noopener"
  >
    <img
      src={GoogleSafe}
      alt="Google Safe"
      loading="lazy"
      width="100%"
      height="auto"
    />
  </Link>
)

export default GoogleSafeIcon
