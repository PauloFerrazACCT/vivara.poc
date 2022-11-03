import { Link } from '@faststore/ui'
import React from 'react'

const LinkItem = ({ isLifeMenu, submenuItem }: any) => {
  return submenuItem?.submenu?.map((linkItem: any, index: number) => {
    return (
      <Link
        className={isLifeMenu === true ? 'life-link-item' : 'link-item'}
        href={linkItem.link}
        key={index}
      >
        {linkItem.label}
      </Link>
    )
  })
}

export default LinkItem
