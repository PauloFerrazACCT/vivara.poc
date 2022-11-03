type Measures = number | null
type FingerName = 'Polegar' | 'Indicador' | 'Médio' | 'Anelar' | 'Mínimo'
type FingerId = 0 | 1 | 2 | 3 | 4
type HandSide = 'right' | 'left'

interface Hands {
  left: Finger[];
  right: Finger[];
}

interface Finger {
  id: FingerId;
  name: FingerName;
  measures: Measures[];
}
