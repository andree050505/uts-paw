import { NavLink } from 'react-router-dom'

export default function Navigasi() {
  const kelas = ({ isActive }) => (isActive ? 'aktif' : undefined)
  return (
    <nav aria-label="Navigasi utama">
      <ul>
        <li>
          <NavLink to="/" end className={kelas}>
            Beranda
          </NavLink>
        </li>
        <li>
          <NavLink to="/koleksi" className={kelas}>
            Koleksi
          </NavLink>
        </li>
        <li>
          <NavLink to="/tambah" className={kelas}>
            Tambah
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistik" className={kelas}>
            Statistik
          </NavLink>
        </li>
        <li>
          <NavLink to="/tentang" className={kelas}>
            Tentang
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
