import { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

export const KoleksiContext = createContext(null)

export function KoleksiProvider({ children }) {
  const [tersimpan, setTersimpan] = useLocalStorage('koleksi', null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (Array.isArray(tersimpan) && tersimpan.length > 0) {
      setItems(tersimpan)
      setLoading(false)
      return
    }

    async function muatData() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/koleksi.json`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setTersimpan(data)
        setItems(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    muatData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!loading && !error && items.length > 0) {
      setTersimpan(items)
    }
  }, [items, loading, error]) // eslint-disable-line react-hooks/exhaustive-deps

  const tambah = (dataForm) => {
    const idBaru = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1
    const itemBaru = { ...dataForm, id: idBaru, waktuMasak: Number(dataForm.waktuMasak) }
    setItems((prev) => [...prev, itemBaru])
  }

  const hapus = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <KoleksiContext.Provider value={{ items, loading, error, tambah, hapus }}>
      {children}
    </KoleksiContext.Provider>
  )
}

export function useKoleksiContext() {
  const ctx = useContext(KoleksiContext)
  if (!ctx) throw new Error('useKoleksiContext harus digunakan di dalam KoleksiProvider')
  return ctx
}
