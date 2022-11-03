import { cheaperSla, fasterSla } from 'src/utils/shipment'

import handleShippingData from './handleShippingData'

export const handleDeliverySlas = async (items: Item[], postalCode: string) => {
  const data = await handleShippingData(items, postalCode)
  let deliverySlas = data.logisticsInfo?.[0].slas.filter(
    (sla: any) => sla.deliveryChannel !== 'pickup-in-point'
  )

  const scheduledSla = deliverySlas.find((sla: any) => sla?.id === 'Agendada')

  deliverySlas = deliverySlas?.filter(
    (sla: any) => sla?.id !== scheduledSla?.id
  )

  const pickupSlas = data.logisticsInfo?.[0].slas.filter(
    (sla: any) => sla?.deliveryChannel === 'pickup-in-point'
  )

  const pickupSlaFinal =
    pickupSlas.length > 0
      ? { ...pickupSlas[0], name: 'Retirada em loja' }
      : false

  const filterDeliverySlas = deliverySlas.filter(
    (sla: any) => sla.id !== cheaperSla(deliverySlas)[0].id
  )

  const slasFinal: any = [
    ...cheaperSla(deliverySlas),
    ...fasterSla(filterDeliverySlas),
    scheduledSla,
    pickupSlaFinal,
  ]

  return slasFinal
}
