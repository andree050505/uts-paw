import { useEffect, useState } from 'react'

// simpan dan baca nilai dari localStorage secara reaktif
export default function useLocalStorage(kunci, nilaiAwal) {
  const [nilai, setNilai] = useState(() => {
    try {
      const tersimpan = localStorage.getItem(kunci)
      return tersimpan !== null ? JSON.parse(tersimpan) : nilaiAwal
    } catch {
      return nilaiAwal
    }
  })

  useEffect(() => {
    try {
      if (nilai === null || nilai === undefined) {
        localStorage.removeItem(kunci)
      } else {
        localStorage.setItem(kunci, JSON.stringify(nilai))
      }
    } catch {
      // localStorage tidak tersedia
    }
  }, [kunci, nilai])

  return [nilai, setNilai]
}
