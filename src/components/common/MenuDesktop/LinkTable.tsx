import { Link } from '@faststore/ui'
import React from 'react'

import RenderIcon from './RenderIcon'

const checkBold = (linkName: string) => {
  // TODO: Add a way to set bold items in CMS to avoid hardcoding it.
  const boldItems: BoldItems = {
    'Outros anéis': true,
    'Ver todas': true,
    'Ver todos': true,
  }

  return boldItems[linkName] || false
}

const LinkTable = ({ isLifeMenu, submenuItem }: any) => {
  return (
    <>
      <p className="table-link-title">{submenuItem.label}</p>
      {submenuItem?.submenu?.map((linkItem: any, index: number) => {
        return (
          <Link
            className={
              isLifeMenu === true ? 'life-table-link-item' : 'table-link-item'
            }
            href={linkItem.link}
            key={index}
          >
            {linkItem.image && (
              <>
                {linkItem.image.includes('.png') ? (
                  <img src={linkItem.image} alt={linkItem.label} />
                ) : (
                  <RenderIcon name={linkItem.image} />
                )}
              </>
            )}
            {checkBold(linkItem?.label)
              ? linkItem.label && (
                  <p>
                    <b>{linkItem.label}</b>
                  </p>
                )
              : linkItem.label && <p>{linkItem.label}</p>}
          </Link>
        )
      })}
    </>
  )
}

export default LinkTable

type BoldItems = {
  [key: string]: boolean
}
