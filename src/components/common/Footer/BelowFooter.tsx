import type { FC } from 'react'
import React from 'react'
import ACCTIcon from 'src/components/icons/ACCTIcon'
import GoogleSafeIcon from 'src/components/icons/GoogleSafeIcon'
import Logo from 'src/components/icons/Logo'
import ReclameAqui from 'src/components/icons/ReclameAqui'
import VtexIcon from 'src/components/icons/VtexIcon'

import './style.scss'

const BelowFooter: FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content-wrapper">
        <div className="copyright-container">
          <Logo />
          <span className="span-copyright">
            Copyright © 2022, todos os direitos reservados.
          </span>
        </div>
        <div className="developer-container">
          <span>Desenvolvidor por:</span>
          <ACCTIcon />
          <VtexIcon />
        </div>
        <div className="safe-container">
          <GoogleSafeIcon />
          <ReclameAqui />
        </div>
      </div>
    </footer>
  )
}

export default BelowFooter
