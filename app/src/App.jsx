import { Route, Routes } from 'react-router-dom'
import { KoleksiProvider } from './context/KoleksiContext.jsx'
import Navigasi from './components/Navigasi.jsx'
import Beranda from './pages/Beranda.jsx'
import Koleksi from './pages/Koleksi.jsx'
import Detail from './pages/Detail.jsx'
import Tambah from './pages/Tambah.jsx'
import Statistik from './pages/Statistik.jsx'
import Tentang from './pages/Tentang.jsx'
import TidakDitemukan from './pages/TidakDitemukan.jsx'
import './App.css'

export default function App() {
  return (
    <KoleksiProvider>
      <header>
        <Navigasi />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/koleksi" element={<Koleksi />} />
          <Route path="/koleksi/:id" element={<Detail />} />
          <Route path="/tambah" element={<Tambah />} />
          <Route path="/statistik" element={<Statistik />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="*" element={<TidakDitemukan />} />
        </Routes>
      </main>
    </KoleksiProvider>
  )
}
