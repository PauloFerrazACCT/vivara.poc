interface Props {
  categoryTree: Array<{
    item: string
    name: string
    position: number
  }>
}

const ringType = {
  imgUrl: 'anel_sizeguide.gif',
  measureTitle: 'Selecione o tamanho',
  measureType: 'Tamanho',
  imgTypeOptions: {
    width: 270,
    height: 240,
  },
}

const necklaceType = {
  imgUrl: 'medidas_colar_mobile2.jpg',
  measureTitle: 'Selecione a espessura',
  measureType: 'Espessura',
  imgTypeOptions: {
    width: 320,
    height: 176,
  },
}

const braceletType = {
  imgUrl: 'pulseira_sizeguide.gif',
  measureTitle: 'Selecione o tamanho',
  measureType: 'Tamanho',
  imgTypeOptions: {
    width: 270,
    height: 240,
  },
}

const collarType = {
  imgUrl: '',
  measureTitle: 'Selecione o tamanho',
  measureType: 'Tamanho',
  imgTypeOptions: {
    width: 0,
    height: 0,
  },
}

const circletType = {
  imgUrl: '',
  measureTitle: 'Selecione o tamanho',
  measureType: 'Tamanho',
  imgTypeOptions: {
    width: 0,
    height: 0,
  },
}

const useProductCategory = ({ categoryTree }: Props) => {
  for (const { item } of categoryTree) {
    if (
      item.includes('anel') ||
      item.includes('aneis') ||
      item.includes('aliança')
    ) {
      return ringType
    }

    if (item.includes('colares') || item.includes('correntes')) {
      return necklaceType
    }

    if (item.includes('pulseiras')) {
      return braceletType
    }

    if (item.includes('coleira') || item.includes('coleiras')) {
      return collarType
    }

    if (item.includes('argola') || item.includes('argolas')) {
      return circletType
    }
  }

  return ringType
}

export default useProductCategory
