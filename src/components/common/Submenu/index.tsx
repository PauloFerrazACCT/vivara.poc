import React, { Fragment } from 'react'

import SubmenuContainer from './SubmenuContainer'

interface Props {
  menu: Menu[]
  variant?: string
}

interface Menu {
  label: string
  items: MenuChildren[]
}

interface MenuChildren {
  label: string
  link: string
}

const Submenu = ({ menu }: Props) => {
  const elements = menu?.map(({ label, items }: Menu, index: number) => {
    return <SubmenuContainer key={index} label={label} items={items} />
  })

  return <Fragment>{elements}</Fragment>
}

export default Submenu
