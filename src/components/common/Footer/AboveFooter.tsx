import React, { memo } from 'react'
import { List as UIList, Icon as UIIcon, Link } from '@faststore/ui'
import AppleStoreIcon from 'src/components/icons/AppleStoreIcon'
import GooglePlayIcon from 'src/components/icons/GooglePlayIcon'
import SearchStoreFooter from 'src/components/common/searchStore/SearchStoreFooter'
import NewsletterFooter from 'src/components/common/Newsletter/NewsletterFooter'
import PrivacyPolicy from 'src/components/sections/PrivacyPolicy'

import { SocialNetworkList } from './SocialNetworkList'
import Submenu from '../Submenu/index'
import { footerMenu } from '../Submenu/submenuItems'
import './footer.scss'

interface Props {
  hideAboveFooter: boolean | undefined
}

const AboveFooter = ({ hideAboveFooter }: Props) => {
  return (
    <footer>
      {!hideAboveFooter && (
        <div className="footer-section">
          <div className="footer-upper-container">
            <NewsletterFooter />
            <PrivacyPolicy />
          </div>
          <div className="footer-upper-container">
            <SearchStoreFooter />
          </div>
        </div>
      )}
      <div className="footer-section menu">
        <Submenu menu={footerMenu} />
      </div>
      <div className="footer-section social-network">
        <section>
          <h2 className="social-text">Redes Sociais</h2>
          <div className="footer-bottom__social">
            <SocialNetworkList />
            <UIList className="store-container footer-store-apps">
              <li className="store-container-li google">
                <Link
                  href="https://play.google.com/store/apps/details?id=tellerina.com.br.vivara&hl=pt-BR&gl=US"
                  title="Google Play"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <UIIcon component={<GooglePlayIcon />} />
                </Link>
              </li>
              <li className="store-container-li">
                <Link
                  href="https://apps.apple.com/br/app/vivara/id1049484217"
                  title="Apple Store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <UIIcon component={<AppleStoreIcon />} />
                </Link>
              </li>
            </UIList>
          </div>
        </section>
      </div>
    </footer>
  )
}

export default memo(AboveFooter)
