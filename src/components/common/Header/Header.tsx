import React, { useEffect, useState, useRef, useContext } from 'react'
import type { FC } from 'react'
import Logo from 'src/components/icons/Logo'
import LifeLogo from 'src/components/icons/LifeLogo'
import MapPinIcon from 'src/components/icons/MapPin'
import SearchIcon from 'src/components/icons/Search'
import UserIcon from 'src/components/icons/User'
import './header.scss'
import { Link } from 'gatsby'
import DrawerMenuIcon from 'src/components/icons/DrawerMenu'
import IconButton from 'src/components/ui/IconButton'
import MenuMobile from 'src/components/common/MenuMobile'
import MenuDesktop from 'src/components/common/MenuDesktop'
import SearchInput from 'src/components/common/SearchInput'
import RegionModal from 'src/components/modal/RegionModal'
import ValidationCartToggle from 'src/components/cart/CartToggle/ValidationCartToggle'
import { useUserContext } from 'src/contexts/user-context'
import { HeaderSizeContext } from 'src/Layout'
import { get } from 'idb-keyval'

import type { TopbarItem } from '../Topbar/Topbar'
import storeConfig from '../../../../store.config'
import Topbar from '../Topbar'

interface Props {
  isPDP: boolean
  location: any
  content?: Record<string, CmsSection[]>
}

export type CmsSection = {
  data: Record<string, TopbarItem[]>
  name: string
}

function validationPage(windowWidthPage: any, setIsRegionOpen: any) {
  if (
    (windowWidthPage > 640 && window.location.pathname === '/') ||
    (windowWidthPage > 640 && window.location.pathname === '/categoria/life') ||
    (windowWidthPage > 640 && window.location.pathname === '/s/')
  ) {
    if (!localStorage.getItem('onSite') || window.location.pathname === '/s/') {
      setIsRegionOpen(true)
    }
  }
}

const getInfo = async (
  setRegionText: any,
  windowWidthPage: any,
  setIsRegionOpen: any
) => {
  const regionData = await get('main::store::regionData')

  if (!!regionData?.city && !!regionData?.state) {
    setRegionText(`${regionData?.city}, ${regionData?.state}`)
  } else {
    validationPage(windowWidthPage, setIsRegionOpen)
  }
}

function setRegionOpen(setIsRegionOpen: any, regionText: string) {
  if (regionText === 'Informar meu CEP') {
    setIsRegionOpen(true)
  }
}

function validationModalOpen(setIsRegionOpen: any, isOnFocus: boolean) {
  if (!isOnFocus) {
    setIsRegionOpen(false)
  }
}

const Header: FC<Props> = ({ isPDP, location, content }) => {
  const { user } = useUserContext()
  const [showSearch, setShowSearch] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isTopBarVisible, setIsTopBarVisible] = useState(true)
  const [isSearchOpen, setisSearchOpen] = useState<boolean>(false)
  const [value, setValue] = useState(false)
  const [isPageSearch, setIsPageSearch] = useState(false)
  const [isHoverOnModal, setIsHoverOnModal] = useState(false)
  const [isOnFocus, setIsOnFocus] = useState(false)
  const [regionText, setRegionText] = useState('Informar meu CEP')
  const [isRegionOpen, setIsRegionOpen] = useState(false)
  const [isUserRegionalized, setIsUserRegionalized] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const headerSizeContext = useContext(HeaderSizeContext)
  const headerTopRowSlideUp = {
    top: isTopBarVisible ? '27px' : '0px',
  }

  const windowWidthPage = window.screen.width

  const topbarContent = content?.sections?.filter((e) => e.name === 'TopBar')
  const searchInputDisplay = showSearch
    ? { display: 'flex' }
    : { display: 'none' }

  useEffect(() => {
    setIsTopBarVisible(true)
    getInfo(setRegionText, windowWidthPage, isPageSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  useEffect(() => {
    if (headerRef?.current && headerSizeContext) {
      const { setHeaderSize } = headerSizeContext

      setHeaderSize(headerRef.current.clientHeight)
    }
  }, [headerSizeContext])

  const categoriesMenu: any = content?.sections?.filter(
    (e) => e.name === 'CategoriesMenu'
  )

  const menuItemDesktop = JSON.parse(
    categoriesMenu?.[0]?.data?.MenuDesktopVivara
  )

  const menuItemMobile = JSON.parse(categoriesMenu?.[0]?.data?.MenuMobileVivara)

  useEffect(() => {
    showSearch
      ? (
          document.querySelector('[aria-label="search"]') as HTMLElement
        )?.focus()
      : ''
  })

  useEffect(() => {
    const localWindow = window.location.href.toString()
    const newUrlPreview = localWindow.split('/')

    for (const url of newUrlPreview) {
      if (url === 's') {
        setIsPageSearch(true)
      }
    }

    if (window.location.pathname === '/') {
      setTimeout(() => {
        localStorage.setItem('onSite', 'Is on site')
      }, 1000)
    }

    searchInputDisplay.display === 'none'
      ? setisSearchOpen(true)
      : setisSearchOpen(false)

    const timer = setTimeout(() => {
      validationModalOpen(setIsRegionOpen, isOnFocus)
    }, 3000)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isRegionOpen && (
        <RegionModal
          isOpen={isRegionOpen}
          setIsOpen={setIsRegionOpen}
          isPageSearch={isPageSearch}
          isHoverOnModal={isHoverOnModal}
          setIsHoverOnModal={setIsHoverOnModal}
          isUserRegionalized={isUserRegionalized}
          setIsUserRegionalized={setIsUserRegionalized}
          setIsOnFocus={setIsOnFocus}
        />
      )}
      {isDrawerOpen && (
        <MenuMobile
          setIsDrawerOpen={setIsDrawerOpen}
          isDrawerOpen={isDrawerOpen}
          isLifeMenu={false}
          menuItems={menuItemMobile}
        />
      )}
      <header
        ref={headerRef}
        data-header-container
        className={!isPDP ? 'fixed-header' : ''}
      >
        {topbarContent && (
          <Topbar
            variant="vivara"
            isTopBarVisible={isTopBarVisible}
            setIsTopBarVisible={setIsTopBarVisible}
            content={topbarContent?.[0].data.allItems}
          />
        )}
        <div data-header-wrapper style={headerTopRowSlideUp}>
          <div className="header-content-wrapper">
            <div className="drawer-menu-container">
              <IconButton
                icon={<DrawerMenuIcon />}
                aria-label="Abrir menu"
                className="btn-drawer-menu"
                onClick={() => setIsDrawerOpen(true)}
              />
            </div>
            <span className="logoTop" title="Vivara">
              <Logo />
            </span>
            <div data-life-wrapper>
              <p data-life-text>Visite também</p>
              <LifeLogo />
            </div>
            <button
              data-region-wrapper
              onFocus={() => {
                setRegionOpen(setIsRegionOpen, regionText)
              }}
              onMouseEnter={() => {
                setRegionOpen(setIsRegionOpen, regionText)
              }}
              onClick={() => {
                setIsRegionOpen(true)
              }}
            >
              <MapPinIcon />
              <span
                style={
                  regionText === 'Informar meu CEP'
                    ? { color: '#737373' }
                    : { color: '#F08769' }
                }
                data-region-text
              >
                {regionText}
              </span>
            </button>
            <nav data-menu-wrapper>
              <MenuDesktop
                menuItems={menuItemDesktop}
                isLifeMenu={false}
                isTopBarVisible={isTopBarVisible}
                value={value}
                setValue={setValue}
              />
            </nav>
            <button
              data-button-search
              onMouseOver={() => setValue(false)}
              onClick={() => setShowSearch(!showSearch)}
              onFocus={() => undefined}
            >
              <SearchIcon />
              <span className="search-text">Buscar</span>
            </button>
            <div style={searchInputDisplay} className="searchInput-container">
              <div className="flex-container">
                <div>
                  <SearchInput
                    setShowSearch={setShowSearch}
                    showSearch={showSearch}
                  />
                </div>
              </div>
            </div>
            <div data-login-wrapper>
              {user ? (
                <Link
                  data-login-link
                  to={`${storeConfig.secureSubdomain}/account`}
                >
                  <UserIcon />
                  <span data-login-text className="user">
                    Olá!{' '}
                    {user.givenName || (
                      <span className="email-overflow"> {user.email} </span>
                    )}
                  </span>
                </Link>
              ) : (
                <Link
                  data-login-link
                  to={`${storeConfig.secureSubdomain}/login?returnUrl=${window.location.pathname}`}
                >
                  <UserIcon />
                  <span data-login-text>Olá! Entre ou Cadastre-se</span>
                </Link>
              )}
            </div>
            <ValidationCartToggle isSearchOpen={isSearchOpen} />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
