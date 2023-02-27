import { atom } from 'jotai'

interface Atom {
  data: [],
  newData: [],
  elementProps: {
    index: number,
    source: string
  },
  inputElement: HTMLInputElement | null
  inputQuery: string
}

export default atom<Atom>({
  data: [],
  newData: [],
  elementProps: {
    index: 0,
    source: ''
  },
  inputElement: null,
  inputQuery: ''
})


