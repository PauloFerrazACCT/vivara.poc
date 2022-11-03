export const ReducerImpression = (
  prevState: any,
  action: {
    type: string
    payload: any
  }
) => {
  let array

  switch (action.type) {
    case 'ADD':
      array = [...prevState]
      array.push(action.payload)

      return array

    case 'REMOVE':
      array = [...prevState]
      array.pop()

      return array

    case 'CLEAR':
      return []

    default:
      break
  }

  return array
}
