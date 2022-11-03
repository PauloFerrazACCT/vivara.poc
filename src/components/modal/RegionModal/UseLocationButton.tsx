import React, { useEffect, useState } from 'react'
import Button from 'src/components/ui/Button'
import MapPinIcon from 'src/components/icons/MapPin'
import { GoogleApiWrapper } from 'google-maps-react'
import Spinner from 'src/components/common/Spinner'
import type { IMapProps } from 'google-maps-react'

const UseLocationButton = ({
  handleSubmit,
  setCep,
  cep,
}: UseLocationButtonProps) => {
  const [locationError, setLocationError] = useState('none')
  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState({ lat: 0, lng: 0 })
  const geocoder = new google.maps.Geocoder()

  const handleUseLocation = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    setCep('')

    navigator.geolocation.getCurrentPosition(
      function geolocateSuccess(userPosition) {
        setPosition({
          lat: userPosition.coords.latitude,
          lng: userPosition.coords.longitude,
        })
      },
      function geolocateError(error) {
        console.error('navigator.geolocation error =>', error)
        error.code === 1
          ? setLocationError('accessDenied')
          : setLocationError('navigator')
        setIsLoading(false)
      }
    )
  }

  useEffect(() => {
    if (position.lat === 0 && position.lng === 0) {
      return
    }

    geocoder.geocode(
      { location: { lat: position.lat, lng: position.lng } },
      (results: any, status: string) => {
        if (status === 'ZERO_RESULTS') {
          setLocationError('noResults')
          setIsLoading(false)

          return
        }

        if (status !== 'OK') {
          setLocationError('mapsapi')
          setIsLoading(false)

          return
        }

        results.find((result: MapsApiResult) => {
          return result.address_components.find(
            (addressComponent: AddressComponentType) => {
              if (addressComponent?.types[0] === 'postal_code') {
                if (cep !== addressComponent?.short_name) {
                  setCep(addressComponent?.short_name)
                }

                setIsLoading(false)

                return true
              }

              return false
            }
          )
        })
      }
    )

    handleSubmit()
  }, [position, setCep, cep])

  if (locationError === 'noResults') {
    return (
      <Button className="region-modal__use-location-btn locationError">
        <MapPinIcon />
        <p>
          Não foi possível buscar sua localização. Por favor digite seu CEP.
        </p>
      </Button>
    )
  }

  if (locationError === 'accessDenied') {
    return (
      <Button className="region-modal__use-location-btn locationError">
        <MapPinIcon />
        <p>É necessario permitir acesso a sua localização para esse site.</p>
      </Button>
    )
  }

  if (locationError === 'mapsapi') {
    return (
      <Button className="region-modal__use-location-btn locationError">
        <MapPinIcon />
        <p>Ocorreu um erro. Recarregue a página e tente novamente.</p>
      </Button>
    )
  }

  if (locationError === 'navigator') {
    return (
      <Button className="region-modal__use-location-btn locationError">
        <MapPinIcon />
        <p>O navegador não suporta a ação. Tente novamente em outro browser.</p>
      </Button>
    )
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <Button
      className="region-modal__use-location-btn"
      onClick={handleUseLocation}
    >
      <MapPinIcon />
      <p>Usar minha localização</p>
    </Button>
  )
}

export default GoogleApiWrapper(() => ({
  apiKey: 'AIzaSyDNqv02fN4F2zgkAaCNyxpDRFEnU2VNVbo',
  language: 'pt-BR',
}))(UseLocationButton)

type UseLocationButtonProps = IMapProps & {
  handleSubmit: any
  setCep: any
  cep: string
}

interface MapsApiResult {
  address_components: AddressComponentType[]
}
interface AddressComponentType {
  types: string[]
  long_name: string
  short_name: string
}
