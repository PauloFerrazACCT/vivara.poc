import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './styles.scss'

function SearchStore() {
  const [allStores, setAllStores] = useState<Store[]>([])
  const [orderedStates, setOrderedStates] = useState<string[]>([])
  const [currentStateCities, setCurrentStateCities] = useState<string[]>([])
  const [currentlySelectedStores, setCurrentlySelectedStores] = useState<
    Store[]
  >([])

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

  useEffect(() => {
    if (!window || allStores === []) {
      return
    }

    const isRedirect = new URLSearchParams(window.location?.search).get(
      'redirect'
    )

    const currentlySelectedCity =
      new URLSearchParams(window.location.search).get('city') ?? ''

    const currentlySelectedState =
      new URLSearchParams(window.location.search).get('state') ?? ''

    if (!isRedirect) {
      return
    }

    window.scrollTo(0, 0)

    const redirectedStores = allStores.filter(
      (store: Store) => store.cidade === currentlySelectedCity
    )

    const stateElement = document.getElementById('state') as HTMLSelectElement

    stateElement.value = currentlySelectedState

    findStateStores(currentlySelectedState)

    setCurrentlySelectedStores(redirectedStores)
  }, [allStores])

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

  function listStores() {
    const selectedCityElement = document.getElementById(
      'city'
    ) as HTMLSelectElement

    const selectedCity =
      selectedCityElement?.options[selectedCityElement.selectedIndex].value

    const cityStores = allStores.filter(
      (store: Store) => store.cidade === selectedCity
    )

    setCurrentlySelectedStores(cityStores)
  }

  return (
    <div className="container">
      <h2 className="title">Encontre a Vivara mais próxima de você</h2>
      <div className="containerSelect">
        <span className="text">
          Estado <span>*</span>
        </span>
        <label className="select">
          <select
            id="state"
            onChange={(e) => {
              findStateStores(e.target.value)
            }}
          >
            <option value="Selecione">Selecione</option>
            {orderedStates?.map((state: string) => (
              <option key={state} value={state}>
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
          <select id="city">
            <option value="Selecione">Selecione</option>
            {currentStateCities?.map((city: string, index) => (
              <option key={index} value={city} id="city">
                {city}
              </option>
            ))}
          </select>
        </label>
        <div className="buttonContainer">
          <button className="button" onClick={() => listStores()}>
            Fazer nova busca
          </button>
        </div>
      </div>
      <div className="result">
        <span>Resultado da busca</span>
      </div>
      <div className="containerResult">
        {currentlySelectedStores?.map((store: Store, index) => (
          <ul className="storeList" key={index}>
            <li className="store">{store.loja}</li>
            <li className="address">{store.logradouro}</li>
            <li className="contact">
              <img
                className="iconPhone"
                src="https://lojavivara.vteximg.com.br/arquivos/phone.png"
                alt=""
              />
              {store.telefone} (11) 99999-9999
            </li>
            <li className="obs" value="#">
              {store.obs}
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default SearchStore

interface Store {
  estado: string
  cidade: string
  loja: string
  logradouro: string
  telefone: string
  obs: string
}
