export const DEFAULT_MEASURES: Hands = {
  left: [
    { id: 0, name: 'Polegar', measures: [null, null] },
    { id: 1, name: 'Indicador', measures: [null, null, null] },
    { id: 2, name: 'Médio', measures: [null, null, null] },
    { id: 3, name: 'Anelar', measures: [null, null, null] },
    { id: 4, name: 'Mínimo', measures: [null, null, null] },
  ],
  right: [
    { id: 0, name: 'Polegar', measures: [null, null] },
    { id: 1, name: 'Indicador', measures: [null, null, null] },
    { id: 2, name: 'Médio', measures: [null, null, null] },
    { id: 3, name: 'Anelar', measures: [null, null, null] },
    { id: 4, name: 'Mínimo', measures: [null, null, null] },
  ],
}

const transformSStringToJson = (value: string) => {
  const replacedString = value.replaceAll("'", '"')

  return JSON.parse(replacedString)
}

export const convertMeasureToJson = (measureFromMasterdata: string): Hands => {
  if (!measureFromMasterdata) {
    return {} as Hands
  }

  return transformSStringToJson(measureFromMasterdata)
}
