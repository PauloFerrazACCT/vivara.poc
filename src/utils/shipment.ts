const daysInNumber = (days: any) => {
  if (!days) {
    return false
  }

  return Number(days.replace('bd', ''))
}

export const cheaperSla = (slas: any) => {
  const slaFinal: any = []

  for (const sla of slas) {
    if (slaFinal.length === 0) {
      slaFinal.push(sla)
    } else if (sla.price < slaFinal.price) {
      slaFinal.push(sla)
    } else if (sla.price === slaFinal.price) {
      daysInNumber(sla.shippingEstimate) <
        daysInNumber(slaFinal.shippingEstimate) && slaFinal.push(sla)
    }
  }

  return slaFinal
}

export const fasterSla = (slas: any) => {
  const slaFinal: any = []

  for (const sla of slas) {
    if (slaFinal.length === 0) {
      slaFinal.push(sla)
    } else if (
      daysInNumber(sla.shippingEstimate) <
      daysInNumber(slaFinal.shippingEstimate)
    ) {
      slaFinal.push(sla)
    } else if (
      daysInNumber(sla.shippingEstimate) ===
      daysInNumber(slaFinal.shippingEstimate)
    ) {
      sla.price < slaFinal.price && slaFinal.push(sla)
    }
  }

  return slaFinal
}
