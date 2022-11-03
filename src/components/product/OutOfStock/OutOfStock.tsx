import type { ReactElement } from 'react'
import React, { useState } from 'react'
import { Input } from '@faststore/ui'
import Button from 'src/components/ui/Button'
import { Bell as BellIcon } from 'phosphor-react'
import axios from 'axios'
import './styles.scss'

export interface OutOfStockProps {
  /**
   * ID to find this component in testing tools (e.g.: cypress,
   * testing-library, and jest).
   */
  testId?: string
  /**
   * The text tha goes inside the notification button.
   */
  buttonTxt?: string
  /**
   * Message describing how the user will be notified.
   */
  notificationMsg?: string
  /**
   * The Out of Stock Section's title.
   */
  title?: string
  /**
   * Notification icon.
   */
  icon?: ReactElement
  /**
   * Sku ID.
   */
  skuId: string
}

function OutOfStock(props: OutOfStockProps) {
  const {
    title = 'Out of Stock',
    notificationMsg = 'Notify me when available',
    buttonTxt = 'Send',
    icon = <BellIcon />,
    testId = 'store-out-of-stock',
    skuId,
  } = props

  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)

  const hasEmptyField = !email || !name || !email.trim() || !name.trim()

  const submitAvailabilyNotify =
    (customerEmail: string, customerName: string, sku: string) => async () => {
      const isValidEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(
        customerEmail
      )

      if (!isValidEmail) {
        setEmailError(true)

        return
      }

      try {
        setLoading(true)
        await axios.post('/api/productAvailability', {
          skuId: sku,
          name: customerName,
          email: customerEmail,
          notificationSend: 'false',
          createdAt: new Date().toISOString(),
        })
        setSuccess(true)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

  const handleChangeName = (event: React.ChangeEvent<{ value: string }>) =>
    setName(event.target.value)

  const handleChangeEmail = (event: React.ChangeEvent<{ value: string }>) => {
    setEmailError(false)
    setEmail(event.target.value)
  }

  if (success) {
    return (
      <div data-store-out-of-stock data-testid={testId} aria-live="polite">
        Pronto! Assim que o produto estiver disponível novamente nós avisaremos.
      </div>
    )
  }

  return (
    <div data-store-out-of-stock data-testid={testId} aria-live="polite">
      <p>{title}</p>
      <p className="outOfStock__message">
        {icon} {notificationMsg}
      </p>
      <div className="outOfStock__inputsContainer">
        <label className="outOfStock__label" htmlFor="name">
          Nome
        </label>
        <Input
          id="name"
          className="outOfStock__inputName"
          aria-label="Name"
          value={name}
          onChange={handleChangeName}
          placeholder="Nome"
          disabled={loading}
        />

        <label className="outOfStock__label" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          className="outOfStock__inputEmail"
          type="email"
          aria-label="Email"
          value={email}
          onChange={handleChangeEmail}
          placeholder="Email"
          disabled={loading}
        />
        {emailError && (
          <span className="outOfStock__error">Email inválido</span>
        )}
      </div>
      <Button
        className="outOfStock__submitButton"
        variant="primary"
        onClick={submitAvailabilyNotify(email, name, skuId)}
        disabled={loading || hasEmptyField}
      >
        {loading ? 'Cadastrando' : buttonTxt}
      </Button>
      {error && (
        <span className="outOfStock__error">
          Falha ao se cadastrar, tente novamente
        </span>
      )}
    </div>
  )
}

export default OutOfStock
