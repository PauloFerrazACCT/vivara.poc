import axios from 'axios'
import { set } from 'idb-keyval'
import { validateSession } from 'src/sdk/session'

interface HandleRegionalizeUserProps {
  id: string
  currentCep: string
  postalCodeData: any
  partialSession: any
}

export const handleRegionalizeUser = async ({
  id,
  currentCep,
  postalCodeData,
  partialSession,
}: HandleRegionalizeUserProps) => {
  const { data: newOrderFormId } = await axios.get('/api/getOrderFormId')

  if (id === '') {
    await set('main::store::cart', {
      id: newOrderFormId,
      items: {},
    })
  }

  const { state, city } = postalCodeData

  try {
    partialSession.postalCode = currentCep
    const newSession = await validateSession({
      ...partialSession,
      postalCode: currentCep,
    })

    if (newSession) {
      await set('fs::session', newSession)
    }
  } catch (error) {
    console.error(error)
  }

  try {
    await axios.post('/api/regionalizeOrderform', {
      postalCodeData,
      orderformID: id === '' ? newOrderFormId : id,
    })
  } catch (error) {
    console.error(error)
  }

  try {
    await set('main::store::regionData', {
      city,
      state,
      hasModalOpened: false,
    })
  } catch (error) {
    console.error(error)
  }
}
