import { Button } from '@faststore/ui'
import React, { useCallback, useEffect, useState, useContext } from 'react'
import impersonateCustomer from 'src/sdk/telemarketing/impersonateCustomer'
import { HeaderSizeContext } from 'src/Layout'

import type { TelemarketingStatus } from '../../../sdk/telemarketing/getTelemarketingStatus'
import getTelemarketingStatus from '../../../sdk/telemarketing/getTelemarketingStatus'

import './styles.scss'

export default function TelemarketingBar() {
  const [telemarketingStatus, setTelemarketingStatus] = useState<
    TelemarketingStatus | undefined
  >()

  const headerSizeContext = useContext(HeaderSizeContext)

  const [error, setError] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const cachedTelemarketingStatus = localStorage.getItem('telemarketing')

    if (cachedTelemarketingStatus !== 'undefined') {
      const { sessionToken } =
        typeof cachedTelemarketingStatus === 'string'
          ? JSON.parse(cachedTelemarketingStatus)
          : {
              sessionToken: null,
            }

      getTelemarketingStatus(sessionToken)
        .then((res) => {
          setTelemarketingStatus(res)
          setError(false)
        })
        .catch(() => setError(true))
    }
  }, [setError])

  useEffect(() => {
    localStorage.setItem('telemarketing', JSON.stringify(telemarketingStatus))
  }, [telemarketingStatus])

  const impersonate = useCallback(() => {
    // eslint-disable-next-line no-alert
    const customerEmail = prompt(
      'Qual email do cliente você quer impersonar?'
    )?.trim()

    if (!customerEmail || !telemarketingStatus?.sessionToken) {
      // eslint-disable-next-line no-alert
      alert('email inválido')

      return
    }

    impersonateCustomer(customerEmail, telemarketingStatus?.sessionToken).then(
      (res) => {
        setTelemarketingStatus({
          ...telemarketingStatus,
          customerEmail: res.customerEmail,
        })
      }
    )
  }, [telemarketingStatus])

  if (error) {
    return null
  }

  if (telemarketingStatus?.canImpersonate) {
    headerSizeContext?.setIsTelemarketingBarVisible(true)

    return (
      <div className="telemarketing-wrapper">
        <p className="telemarketing-text">
          Atendente: {telemarketingStatus.userEmail ?? 'Não autenticado'}
        </p>
        <p className="telemarketing-text">
          Cliente: {telemarketingStatus.customerEmail ?? '-'}
        </p>
        <Button className="telemarketing-button" onClick={impersonate}>
          Entrar como cliente
        </Button>
      </div>
    )
  }

  return null
}
