import React from 'react'
import type { PropsWithChildren, FC } from 'react'
import type { LoadableComponent } from '@loadable/component'

interface Props<D> {
  data: D
  seo: FC<D>
  above: FC<D>
  below: LoadableComponent<D>
}

export const View = <D extends PropsWithChildren<Props<D>>>(props: any) => {
  return (
    <>
      <props.seo {...props.data} />
      <props.above {...props.data} />
      <props.below {...props.data} />
    </>
  )
}
