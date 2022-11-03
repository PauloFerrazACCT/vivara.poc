import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './styles.scss'

export type TStateValue = string | undefined

function SearchStoreFooter() {
  const [allStores, setAllStores] = useState<Store[]>([])
  const [orderedStates, setOrderedStates] = useState<string[]>([])
  const [currentStateCities, setCurrentStateCities] = useState<string[]>([])
  const [stateName, setStateName] = useState<TStateValue>()
  const [cityName, setCityName] = useState<TStateValue>()
  const [borderRedState, setBorderRedState] = useState<boolean>(false)
  const [borderRedCity, setBorderRedCity] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

  const reOrderFunction = (a: string, b: string) => {
    return a.localeCompare(b)
  }

  const searchStore = async () => {
    try {
      const response = await axios.get('/api/getSearchStore', {
        headers: {
          'Content-Type': 'aplication/json',
          'REST-Range': 'resources=0-99',
        },
      })

      if (!response.data) {
        return
      }

      const { data } = response

      const unfilteredStates: string[] = data?.map(
        (store: Store) => store.estado
      )

      const filteredStates = unfilteredStates.filter(
        (ele, pos) => unfilteredStates.indexOf(ele) === pos
      )

      filteredStates.sort(reOrderFunction)

      setOrderedStates(filteredStates)

      setAllStores(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    searchStore()
  }, [])

  function findStateStores(state: string) {
    const currentStateStores = allStores.filter(
      (store: Store) => store.estado === state
    )

    const unfilteredCurrentStateCities: string[] = currentStateStores?.map(
      (store: Store) => store.cidade
    )

    const filteredCurrentStateCities = unfilteredCurrentStateCities.filter(
      (ele, pos) => unfilteredCurrentStateCities.indexOf(ele) === pos
    )

    filteredCurrentStateCities.sort(reOrderFunction)

    setCurrentStateCities(filteredCurrentStateCities)
  }

  const buildURL = () => {
    if (!window) {
      return
    }

    window.location.replace(
      `/nossas-lojas?redirect=true&city=${cityName}&state=${stateName}`
    )
  }

  const handleButton = (stateValue: TStateValue, cityValue: TStateValue) => {
    if (!stateValue || !cityValue) {
      setButtonDisabled(true)

      return
    }

    setButtonDisabled(false)
  }

  useEffect(() => {
    handleButton(stateName, cityName)
  }, [stateName, cityName])

  const onChangeState = (event: { target: { value: string } }): void => {
    const { value } = event.target

    if (!value) {
      setStateName(value)

      return
    }

    setBorderRedState(false)
    setStateName(value)
    findStateStores(value)
  }

  const onChangeCity = (event: { target: { value: string } }): void => {
    const { value } = event.target

    if (!value) {
      setCityName(value)

      return
    }

    setBorderRedCity(false)
    setCityName(value)
  }

  const handleURL = (): void => {
    if (!stateName) {
      setBorderRedState(true)

      return
    }

    if (!cityName) {
      setBorderRedCity(true)

      return
    }

    setBorderRedCity(false)
    setBorderRedState(false)

    buildURL()
  }

  return (
    <div className="containerFooter">
      <h2 className="title">Encontre a Vivara mais próxima de você</h2>
      <div className="containerSelect">
        <span className="text">
          Estado <span>*</span>
        </span>
        <label className="select">
          <select
            id="state"
            className={borderRedState ? 'borderRed' : ''}
            onChange={(event) => onChangeState(event)}
          >
            <option value="">Selecione</option>
            {orderedStates?.map((state: string) => (
              <option key={state} value={state} id="state">
                {state}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="containerSelect">
        <span className="text">
          Cidades <span>*</span>
        </span>
        <label className="select">
          <select
            id="city"
            className={borderRedCity ? 'borderRed' : ''}
            onChange={(event) => onChangeCity(event)}
          >
            <option value="">Selecione</option>
            {currentStateCities?.map((city: string, index) => (
              <option key={index} value={city} id="city">
                {city}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="buttonContainer">
        <button
          className={buttonDisabled ? 'button btnDisabled' : 'button'}
          onClick={() => handleURL()}
        >
          Encontrar Lojas
        </button>
      </div>
    </div>
  )
}

export default SearchStoreFooter

interface Store {
  estado: string
  cidade: string
  loja: string
  logradouro: string
  telefone: string
  obs: string
}
