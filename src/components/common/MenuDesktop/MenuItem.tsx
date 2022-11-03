import { Popover } from '@faststore/ui'
import React, { useRef, useContext } from 'react'
import { Link } from 'gatsby'
import { HeaderSizeContext } from 'src/Layout'

import LinkItem from './LinkItem'
import LinkTable from './LinkTable'

const MenuItem = ({
  item,
  indexRef,
  value,
  setValue,
  popUpActual,
  setPopUpActual,
  isLifeMenu,
  isTopBarVisible,
}: any) => {
  const ref = useRef(null)
  const headerSizeContext = useContext(HeaderSizeContext)

  const parsedLabelMenu = item.label
    .normalize('NFD')
    /* eslint-disable-next-line */
    .replace(/[\u0300-\u036f\ ]/g, '')
    .toLowerCase()

  return (
    <>
      <Link
        key={indexRef}
        to={item.link}
        ref={ref}
        onMouseOver={() => {
          setValue(true)
          setPopUpActual(indexRef)
        }}
        onFocus={() => setValue(true)}
        className={isLifeMenu === true ? 'menu-item-life' : 'menu-item'}
      >
        {item.label}
      </Link>
      {value === true && indexRef === popUpActual && (
        <Popover
          data-menu-slideup={!isTopBarVisible}
          targetRef={ref}
          data-label={parsedLabelMenu}
          data-telemarketingbar-active={
            headerSizeContext?.isTelemarketingBarVisible
          }
        >
          <div
            className={
              isLifeMenu === true ? 'life-popover-external' : 'popover-external'
            }
            key={indexRef}
            onMouseOver={() => setValue(true)}
            onFocus={() => setValue(true)}
            onMouseLeave={() => setValue(false)}
            onBlur={() => setValue(false)}
          >
            <div className="popover-container">
              {item?.submenu?.map((submenuItem: any) => {
                const parsedLabelSubMenu = submenuItem?.label
                  ?.normalize('NFD')
                  /* eslint-disable-next-line */
                  .replace(/[\u0300-\u036f\ ]/g, '')
                  .toLowerCase()

                return submenuItem.label ? (
                  <div
                    className={`${
                      isLifeMenu === true
                        ? 'life-link-container'
                        : 'link-container'
                    } ${parsedLabelSubMenu ?? ''}`}
                    key={submenuItem.label}
                  >
                    <LinkTable
                      isLifeMenu={isLifeMenu}
                      submenuItem={submenuItem}
                    />
                  </div>
                ) : (
                  <div
                    className={
                      isLifeMenu === true
                        ? 'life-link-container-border'
                        : 'link-container-border'
                    }
                    key={submenuItem.label}
                  >
                    <LinkItem
                      isLifeMenu={isLifeMenu}
                      submenuItem={submenuItem}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </Popover>
      )}
    </>
  )
}

export default MenuItem
