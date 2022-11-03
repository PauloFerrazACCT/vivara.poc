import React, { useEffect, useState } from 'react'
import DrawerMenuIcon from 'src/components/icons/DrawerMenu'
import DrawerMenuIconWhite from 'src/components/icons/DrawerMenuWhite'
import MenuBlackArrowUpIcon from 'src/components/icons/MenuBlackArrowUp'
import MenuWhiteArrowUpIcon from 'src/components/icons/MenuWhiteArrowUp'
import './textAnchor.scss'

type TextAnchorProps = {
  label: string
  id: string
}
type Props = {
  menu: TextAnchorProps[]
  background: string
  textcolor: string
  icontheme: string
  fontfamily: string
}

function scrollAnchor(componentId: any) {
  const headerHeight =
    document?.querySelector('.fixed-header')?.getBoundingClientRect()?.height ??
    0

  const componentPosition =
    parseFloat(
      document.querySelector(componentId)?.getBoundingClientRect().top
    ) + window.scrollY

  document
    ?.querySelector('html, body')
    ?.scrollTo({ top: componentPosition - headerHeight, behavior: 'smooth' })
}

function TextAnchor({
  menu,
  background,
  textcolor,
  icontheme,
  fontfamily,
}: Props) {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', () =>
      setIsMobile(window.innerWidth < 1024)
    )
  }, [])
  const menuClick = () => setIsClicked(!isClicked)

  return (
    <div
      className="text-anchor-container"
      style={{
        backgroundColor: background,
      }}
    >
      {isClicked === false ? (
        <button
          aria-label="Abrir menu"
          className="text-anchor-container__btn-menu"
          onClick={menuClick}
          style={{
            color: textcolor,
            fontFamily: fontfamily === '2' ? 'roboto' : 'Cormorant Garamond',
          }}
        >
          {icontheme === '2' ? <DrawerMenuIconWhite /> : <DrawerMenuIcon />}{' '}
          Menu
        </button>
      ) : (
        <ul
          className="text-anchor-container__lista"
          style={{
            backgroundColor: background,
          }}
        >
          {menu?.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => scrollAnchor(`#${item.id}`)}
                className="text-anchor-container__link-label"
                style={{
                  backgroundColor: background,
                  color: textcolor,
                  fontFamily:
                    fontfamily === '2' ? 'roboto' : 'Cormorant Garamond',
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
          {menu.length > 4 && isMobile && (
            <button
              className="text-anchor-container__btn-return "
              onClick={menuClick}
            >
              {icontheme === '2' ? (
                <MenuWhiteArrowUpIcon />
              ) : (
                <MenuBlackArrowUpIcon />
              )}
            </button>
          )}
        </ul>
      )}
    </div>
  )
}

export default TextAnchor
