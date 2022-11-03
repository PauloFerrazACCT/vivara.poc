import React from 'react'
import { Price as UIPrice } from '@faststore/ui'
import type { PriceProps } from '@faststore/ui'
import Decimal from 'decimal.js'

import './installment.scss'

interface InstallmentProps extends PriceProps {
  isKit?: boolean
}

const Installment = ({ value, formatter, isKit = false }: InstallmentProps) => {
  // TODO: Remove this installment implementation when Vtex to provide the installments info
  const [instalments, setInstalments] = React.useState<number>(1)
  const [instalmentsValue, setInstalmentsValue] = React.useState<number>(1)

  React.useEffect(() => {
    const installmentQtt = new Decimal(value).dividedBy(50).floor().toNumber()
    const installmentVal = parseFloat(
      new Decimal(value).dividedBy(instalments).toFixed(2)
    )

    if (installmentQtt > 10) {
      setInstalments(10)
      setInstalmentsValue(
        parseFloat(new Decimal(value).dividedBy(10).toFixed(2))
      )

      return
    }

    setInstalments(installmentQtt)
    setInstalmentsValue(installmentVal)
  }, [instalments, value])

  if (value <= 50 || instalments <= 1) {
    return <></>
  }

  return (
    <span className="installment-container">
      <p className="installment-prefix">
        {isKit ? `${instalments}x de` : `${instalments}x sem juros de`}
      </p>
      <UIPrice
        className="price"
        value={instalmentsValue}
        formatter={formatter}
      />
    </span>
  )
}

export default Installment
