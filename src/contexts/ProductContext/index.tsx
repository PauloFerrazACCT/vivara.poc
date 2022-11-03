import type { FC } from 'react'
import React, { useMemo, useState, createContext } from 'react'

export interface IContext {
  selectedSKU: number
  setSelectedSKU: (val: number) => void
}

export const SkuContext = createContext<IContext | undefined>(undefined)

export const SkuProvider: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [selectedSKU, setSelectedSKU] = useState<number>(0)

  const value = useMemo(
    () => ({
      selectedSKU,
      setSelectedSKU,
    }),
    [selectedSKU]
  )

  return <SkuContext.Provider value={value}>{children}</SkuContext.Provider>
}
