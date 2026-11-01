import { Link } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import mahasiswa from '../../mahasiswa.json'

export default function Beranda() {
  const { items = [], loading } = useKoleksi()
  const daftarItems = Array.isArray(items) ? items : []
  const jumlahKategori = new Set(daftarItems.map((item) => item.kategori)).size

  return (
    <section>
      <h1>Resep Masakan Nusantara</h1>
      <p>Tema: {mahasiswa.tema}</p>
      {loading ? (
        <p>Memuat ringkasan...</p>
      ) : (
        <p>
          Ada {daftarItems.length} resep dalam {jumlahKategori} kategori.
        </p>
      )}
      <Link to="/koleksi" className="tombol-tautan">
        Lihat semua resep
      </Link>
    </section>
  )
}
