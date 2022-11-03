/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { useContext, createContext, useState } from 'react'
import { deepObjectCopy } from 'src/utils'
import axios from 'axios'
import { convertMeasureToJson, DEFAULT_MEASURES } from 'src/utils/measures'
import { useSession } from 'src/sdk/session'

const MeasureContext = createContext<MeasureContextProps>(
  {} as MeasureContextProps
)

export const MeasureProvider: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [measures, setMeasures] = useState<Hands>({} as Hands)
  const [measuresId, setMeasuresId] = useState('')

  const { person } = useSession()

  const instantiateHands = async () => {
    try {
      const { data } = await axios.post('/api/measures', {
        userId: person?.id,
        measures: JSON.stringify(DEFAULT_MEASURES),
      })

      setMeasures(DEFAULT_MEASURES)
      setMeasuresId(data.DocumentId)
    } catch (error) {
      throw new Error(`Um erro ocorreu: ${error.message}`)
    }
  }

  const getMeasures = async () => {
    try {
      if (!person?.id) {
        return
      }

      const { data } = await axios.get('/api/measures', {
        params: {
          userId: person?.id,
        },
      })

      if (!data?.length) {
        await instantiateHands()
      } else {
        const measuresObject = convertMeasureToJson(data?.[0].measures)

        setMeasures(measuresObject)
        setMeasuresId(data?.[0].id)
      }
    } catch (error) {
      throw new Error(`Um erro ocorreu: ${error.message}`)
    }
  }

  const updateMeasures = async (value: Hands) => {
    try {
      await axios.patch('/api/measures', {
        measuresId,
        userId: person?.id,
        measures: JSON.stringify(value),
      })
    } catch (error) {
      throw new Error(`Um erro ocorreu: ${error.message}`)
    }
  }

  const editMeasure = async (
    side: HandSide,
    fingerIndex: FingerId,
    phalangeIndex: number,
    newMeasure?: number
  ) => {
    const handsCopy: Hands = deepObjectCopy(measures)

    handsCopy[side][fingerIndex].measures[phalangeIndex] = newMeasure ?? null
    await updateMeasures(handsCopy)
    setMeasures(handsCopy)
  }

  const deleteAllFingerMeasures = async (
    side: HandSide,
    fingerIndex: FingerId
  ) => {
    const handsCopy: Hands = deepObjectCopy(measures)

    const currentFingerMeasures = handsCopy[side][fingerIndex].measures

    const eraseMeasures = currentFingerMeasures?.map((_phalange) => null)

    handsCopy[side][fingerIndex].measures = eraseMeasures

    await updateMeasures(handsCopy)

    setMeasures(handsCopy)
  }

  return (
    <MeasureContext.Provider
      value={{
        measures,
        getMeasures,
        editMeasure,
        deleteAllFingerMeasures,
        updateMeasures,
      }}
    >
      {children}
    </MeasureContext.Provider>
  )
}

export const useMeasureContext = () => {
  return useContext(MeasureContext)
}
