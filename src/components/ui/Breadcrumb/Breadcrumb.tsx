import React, { memo } from 'react'
import { Breadcrumb as UIBreadcrumb } from '@faststore/ui'
import Link from 'src/components/ui/Link'
import type { BreadcrumbProps as UIBreadcrumbProps } from '@faststore/ui'
import { slugifyUrl } from 'src/utils/slugify'

import './breadcrumb.scss'

type ItemElement = {
  item: string
  name: string
  position: number
}
export interface BreadcrumbProps extends UIBreadcrumbProps {
  breadcrumbList: ItemElement[]
}

function Breadcrumb({ breadcrumbList }: BreadcrumbProps) {
  return (
    <UIBreadcrumb divider="/">
      {breadcrumbList?.map(({ item, name }, index, array) => {
        const idSKU = slugifyUrl(item).split('-').pop()
        const slug = slugifyUrl(item).replace(`-${idSKU}`, '/p')

        const url = index !== array.length - 1 ? slugifyUrl(item) : slug

        return (
          <Link to={url} key={String(index)}>
            {name}
          </Link>
        )
      })}
    </UIBreadcrumb>
  )
}

export default memo(Breadcrumb)
