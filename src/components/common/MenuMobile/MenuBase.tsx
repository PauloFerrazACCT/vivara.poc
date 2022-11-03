import { Link } from '@faststore/ui'
import type { FC } from 'react'
import React, { useCallback, useState, useRef } from 'react'
import Accordion from 'src/components/common/MenuMobile/MenuAccordion'
import AccordionItem from 'src/components/common/MenuMobile/MenuAccordionItem'
import RenderIcon from 'src/components/common/MenuDesktop/RenderIcon'

interface IMenuBase {
  json?: any
  isLifeMenu: boolean
}

interface IMap {
  label: string
  submenu: any
  image: string | null
  link?: string
  firstLayer: boolean
}

const MenuBase: FC<IMenuBase> = ({ json, isLifeMenu }) => {
  const refContainer = useRef(null)

  const [indicesExpanded, setIndicesExpanded] = useState<Set<number>>(
    new Set([])
  )

  const onAccordionChange = useCallback((index: number) => {
    if (indicesExpanded.has(index)) {
      indicesExpanded.delete(index)
      setIndicesExpanded(new Set(indicesExpanded))

      return
    }

    indicesExpanded.clear()
    setIndicesExpanded(new Set(indicesExpanded.add(index)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const brandStyle = isLifeMenu ? 'life' : 'vivara'

  return (
    <Accordion expandedIndices={indicesExpanded} onChange={onAccordionChange}>
      {json?.map(
        ({ label, submenu, link, firstLayer, image }: IMap, index: number) => {
          return (
            <>
              {submenu ? (
                <AccordionItem
                  key={`${label}-${index}`}
                  isExpanded={indicesExpanded.has(index)}
                  buttonLabel={label}
                  ref={refContainer}
                  index={index}
                  firstLayer={firstLayer}
                  isLifeMenu={isLifeMenu}
                >
                  <MenuBase json={submenu} isLifeMenu={isLifeMenu} />
                </AccordionItem>
              ) : (
                <Link
                  href={link}
                  className={
                    firstLayer === true
                      ? `firstLayer-menu-item-link__${brandStyle}`
                      : `menu-item-link__${brandStyle}`
                  }
                >
                  {image && (
                    <>
                      {image.includes('.png') ? (
                        <img src={image} alt={label} />
                      ) : (
                        <RenderIcon name={image} />
                      )}
                    </>
                  )}
                  {label}
                </Link>
              )}
            </>
          )
        }
      )}
    </Accordion>
  )
}

export default MenuBase
