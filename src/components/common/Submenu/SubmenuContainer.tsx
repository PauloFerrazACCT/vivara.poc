import { Button } from '@faststore/ui'
import type { FC } from 'react'
import React, { useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'

import Content from './SubmenuContent'
import '../Footer/footer.scss'

interface Props {
  label: string
  items: Item[]
}

interface Item {
  label: string
  link: string
}

const SubmenuContainer: FC<Props> = ({ label, items }) => {
  const [displaySubmenu, setDisplaySubmenu] = useState(false)

  const { width } = useWindowDimensions()
  const activeClass = displaySubmenu ? 'arrow-down' : 'arrow-up'

  return (
    <Button
      onClick={() => setDisplaySubmenu(!displaySubmenu)}
      className="menu-container"
    >
      <div className="menu-footer">
        <h2>{label}</h2>
        <span className={activeClass} />
      </div>
      {width > 1023 || displaySubmenu ? <Content items={items} /> : null}
    </Button>
  )
}

export default SubmenuContainer
