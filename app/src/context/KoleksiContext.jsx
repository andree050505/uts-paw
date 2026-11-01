import { createContext, useContext, useEffect, useReducer } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
        error: null,
      }
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'TAMBAH':
      return { ...state, items: [...state.items, action.payload] }
    case 'HAPUS':
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) }
    default:
      return state
  }
}

export const KoleksiContext = createContext(null)

export function KoleksiProvider({ children }) {
  const [tersimpan, setTersimpan] = useLocalStorage('koleksi', null)
  const [state, dispatch] = useReducer(reducer, { items: [], loading: true, error: null })

  useEffect(() => {
    if (Array.isArray(tersimpan) && tersimpan.length > 0) {
      dispatch({ type: 'SET_ITEMS', payload: tersimpan })
      return
    }

    async function muatData() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/koleksi.json`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setTersimpan(data)
        dispatch({ type: 'SET_ITEMS', payload: data })
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message })
      }
    }

    muatData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!state.loading && !state.error) {
      setTersimpan(state.items)
    }
  }, [state.items]) // eslint-disable-line react-hooks/exhaustive-deps

  const tambah = (dataForm) => {
    const idBaru = state.items.length > 0 ? Math.max(...state.items.map((i) => i.id)) + 1 : 1
    const itemBaru = { ...dataForm, id: idBaru, waktuMasak: Number(dataForm.waktuMasak) }
    dispatch({ type: 'TAMBAH', payload: itemBaru })
  }

  const hapus = (id) => {
    dispatch({ type: 'HAPUS', payload: id })
  }

  return (
    <KoleksiContext.Provider value={{ ...state, tambah, hapus }}>
      {children}
    </KoleksiContext.Provider>
  )
}

export function useKoleksiContext() {
  const ctx = useContext(KoleksiContext)
  if (!ctx) throw new Error('useKoleksiContext harus digunakan di dalam KoleksiProvider')
  return ctx
}
