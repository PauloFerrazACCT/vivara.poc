import React, { useState } from 'react'
import axios from 'axios'

import './styles.scss'

function NewsletterFooter() {
  const [register, setRegister] = useState('')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [buttonName, setButtonName] = useState('Cadastrar')

  const handleChangeEmail = (e: React.ChangeEvent<{ value: string }>) => {
    setEmail(e.target.value)
    setRegister('')
    setError('')
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      setLoading(true)
      setButtonName('Cadastrando')
      const resEmail = await axios.post('/api/getEmailSubscription', { email })

      if (resEmail.data.length > 0) {
        setRegister('Email já cadastrado.')

        return
      }

      await axios.post('/api/subscribeNewsletter', {
        email,
        isNewsletterOptIn: true,
      })
      setRegister('Cadastro realizado com sucesso!')
      setEmail('')
    } catch (err) {
      setError('Ocorreu um erro. Tente novamente.')
    } finally {
      setLoading(false)
      setButtonName('Cadastrar')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="newsletter-container">
        <h2 className="newsletter-title">Acompanhe nossas novidades</h2>
        <span className="newsletter-subtitle">
          Cadastre seu e-mail para receber informações exclusivas
        </span>
        <div className="newsletter-inputContainer">
          <input
            type="email"
            className="newsletter-emailInput"
            id="newsletter-mail"
            value={email}
            placeholder="e-mail"
            required
            onChange={handleChangeEmail}
          />
        </div>
        <div className="confirmation-message">
          {register && <span className="confirmation-ok">{register}</span>}
          {error && <span className="confirmation-error">{error}</span>}
        </div>
        <div className="newsletter-buttonContainer">
          <button
            type="submit"
            className="newsletter-registerButton"
            disabled={loading}
          >
            {buttonName}
          </button>
        </div>
      </div>
    </form>
  )
}

export default NewsletterFooter
