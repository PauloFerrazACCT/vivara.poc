import type { FC } from 'react'
import React from 'react'
import Logo from 'src/components/icons/Logo'
import IconUser from 'src/images/svg/menu-icon-user.svg'
import IconStore from 'src/images/svg/icon-store.svg'
import CloseIcon from 'src/components/icons/Close'
import IconButton from 'src/components/ui/IconButton'
import LifeLogo from 'src/components/icons/LifeLogo'
import { useUserContext } from 'src/contexts/user-context'

import storeConfig from '../../../../store.config'
import MenuBase from './MenuBase'
import './MenuMobile.scss'

interface Props {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
  isDrawerOpen: boolean
  isLifeMenu: boolean
  menuItems: any
}

const MenuMobile: FC<Props> = ({
  setIsDrawerOpen,
  isDrawerOpen,
  isLifeMenu,
  menuItems,
}) => {
  const handleClose = () => setIsDrawerOpen(false)

  const json = menuItems.items
  const { user } = useUserContext()

  return (
    <>
      {isDrawerOpen && (
        <div className="menu-mobile-container">
          <IconButton
            icon={<CloseIcon />}
            aria-label="Fechar menu"
            onClick={handleClose}
            className={
              isLifeMenu
                ? 'btn-close-drawer-menu-life'
                : 'btn-close-drawer-menu'
            }
          />
          <div
            className={
              isLifeMenu ? 'menu-mobile-logo-life' : 'menu-mobile-logo'
            }
          >
            {isLifeMenu ? <LifeLogo /> : <Logo />}
          </div>
          {user ? (
            <a
              href={`${storeConfig.secureSubdomain}/account`}
              className="menu-mobile-login"
            >
              <img src={IconUser} alt="icon user" />
              <h2 data-login-text className="user">
                Olá!{' '}
                {user.givenName || (
                  <h2 className="email-overflow"> {user.email} </h2>
                )}
              </h2>
            </a>
          ) : (
            <a
              href={`${storeConfig.secureSubdomain}/login?returnUrl=${window.location.href}`}
              className="menu-mobile-login"
            >
              <img src={IconUser} alt="icon user" />
              <h2 data-login-text>Olá! Entre ou Cadastre-se</h2>
            </a>
          )}
          <div className="menu-mobile-departament-container">
            <MenuBase json={json} isLifeMenu={isLifeMenu} />
          </div>
          <a href="/nossas-lojas" className="menu-mobile-store">
            <img src={IconStore} alt="icon user" />
            <h2>Nossas lojas</h2>
          </a>
        </div>
      )}
    </>
  )
}

export default MenuMobile
