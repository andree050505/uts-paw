import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import './Tambah.css'

const AWAL = {
  judul: '',
  kategori: 'Makanan Utama',
  daerahAsal: '',
  waktuMasak: '',
  tingkatKesulitan: 'mudah',
}

export default function Tambah() {
  const { tambah } = useKoleksi()
  const navigate = useNavigate()
  const [form, setForm] = useState(AWAL)
  const [galat, setGalat] = useState('')

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const simpan = (e) => {
    e.preventDefault()
    if (form.judul.trim().length < 3) {
      setGalat('Judul wajib diisi, minimal 3 karakter.')
      return
    }
    tambah({ ...form, judul: form.judul.trim() })
    navigate('/koleksi')
  }

  return (
    <form className="formulir" onSubmit={simpan} noValidate>
      <h1>Tambah Resep</h1>

      <label htmlFor="judul">Judul</label>
      <input id="judul" name="judul" value={form.judul} onChange={ubah} />
      {galat && <p role="alert">{galat}</p>}

      <label htmlFor="kategori">Kategori</label>
      <select id="kategori" name="kategori" value={form.kategori} onChange={ubah}>
        <option value="Makanan Utama">Makanan Utama</option>
        <option value="Kudapan">Kudapan</option>
        <option value="Minuman">Minuman</option>
        <option value="Sambal">Sambal</option>
      </select>

      <label htmlFor="daerahAsal">Daerah Asal</label>
      <input id="daerahAsal" name="daerahAsal" value={form.daerahAsal} onChange={ubah} />

      <label htmlFor="waktuMasak">Waktu Masak (menit)</label>
      <input
        id="waktuMasak"
        name="waktuMasak"
        type="number"
        min="1"
        value={form.waktuMasak}
        onChange={ubah}
      />

      <label htmlFor="tingkatKesulitan">Tingkat Kesulitan</label>
      <select id="tingkatKesulitan" name="tingkatKesulitan" value={form.tingkatKesulitan} onChange={ubah}>
        <option value="mudah">mudah</option>
        <option value="sedang">sedang</option>
        <option value="sulit">sulit</option>
      </select>

      <button type="submit">Simpan</button>
    </form>
  )
}
