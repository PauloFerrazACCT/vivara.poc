import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'

import MenuItem from './MenuItem'

import './menuDesktop.scss'

interface Props {
  isLifeMenu: boolean
  isTopBarVisible: boolean
  menuItems: any
  value: boolean
  setValue: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuDesktop: FC<Props> = ({
  isLifeMenu,
  menuItems,
  isTopBarVisible,
  value,
  setValue,
}) => {
  const [popUpActual, setPopUpActual] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => setValue(false))
    }

    return () => window.removeEventListener('scroll', () => setValue(false))
  }, [])

  return menuItems?.items?.map((item: any, index: number) => {
    return (
      <div key={index}>
        {item?.submenu !== null ? (
          <MenuItem
            key={index}
            item={item}
            indexRef={index}
            value={value}
            setValue={setValue}
            popUpActual={popUpActual}
            setPopUpActual={setPopUpActual}
            isLifeMenu={isLifeMenu}
            isTopBarVisible={isTopBarVisible}
          />
        ) : (
          <Link
            className={isLifeMenu === true ? 'menu-item-life' : 'menu-item'}
            to={item.link}
          >
            {item.label}
          </Link>
        )}
      </div>
    )
  })
}

export default MenuDesktop
