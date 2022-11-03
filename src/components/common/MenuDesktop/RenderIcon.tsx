import React from 'react'
import type { ComponentType, FC } from 'react'
import {
  Alfabeto,
  Aliancas,
  AmorRomance,
  Argolas,
  Braceletes,
  BrilhoCores,
  Cadernos,
  Canetas,
  Chokers,
  Colares,
  ComPedras,
  Correntes,
  DatasComemorativas,
  Disney,
  Earcuffs,
  Esportes,
  FamiliaAmigos,
  Fashion,
  Fivela,
  Gourmet,
  LifeMen,
  Lili,
  Maleaveis,
  Musica,
  ParaPets,
  Pendentes,
  Perfumes,
  PetsBichinhos,
  Piercings,
  PortaJoias,
  ProfissoesFormaturas,
  Protecao,
  Rigidas,
  SemPedras,
  SeparadoresMuranos,
  Signos,
  Studs,
  Tornozeleiras,
  Unicos,
  ViagensFerias,
} from 'src/components/icons/Menu'

interface Props {
  name: string
}

const RenderIcon: FC<Props> = ({ name }) => {
  const COMPONENTS: Record<string, ComponentType<any>> = {
    Alfabeto,
    Aliancas,
    AmorRomance,
    Argolas,
    Braceletes,
    BrilhoCores,
    Cadernos,
    Canetas,
    Chokers,
    Colares,
    ComPedras,
    Correntes,
    DatasComemorativas,
    Disney,
    Earcuffs,
    Esportes,
    FamiliaAmigos,
    Fashion,
    Fivela,
    Gourmet,
    LifeMen,
    Lili,
    Maleaveis,
    Musica,
    ParaPets,
    Pendentes,
    Perfumes,
    PetsBichinhos,
    Piercings,
    PortaJoias,
    ProfissoesFormaturas,
    Protecao,
    Rigidas,
    SemPedras,
    SeparadoresMuranos,
    Signos,
    Studs,
    Tornozeleiras,
    Unicos,
    ViagensFerias,
  }

  const Component = COMPONENTS[name]

  return <Component />
}

export default RenderIcon
