type GenericObject = { [key: string]: any }

export const deepObjectCopy = (obj: GenericObject) => {
  return JSON.parse(JSON.stringify(obj))
}
