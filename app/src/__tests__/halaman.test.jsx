import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { KoleksiContext } from '../context/KoleksiContext.jsx'
import Beranda from '../pages/Beranda.jsx'
import Tambah from '../pages/Tambah.jsx'
import TidakDitemukan from '../pages/TidakDitemukan.jsx'

const itemsDummy = [
  { id: 1, judul: 'Rendang', kategori: 'Makanan Utama', daerahAsal: 'Sumbar', waktuMasak: 180, tingkatKesulitan: 'sulit' },
  { id: 2, judul: 'Soto Ayam', kategori: 'Makanan Utama', daerahAsal: 'Jatim', waktuMasak: 90, tingkatKesulitan: 'sedang' },
  { id: 3, judul: 'Klepon', kategori: 'Kudapan', daerahAsal: 'Jateng', waktuMasak: 40, tingkatKesulitan: 'sedang' },
]

const nilaiContextDummy = {
  items: itemsDummy,
  loading: false,
  error: null,
  tambah: vi.fn(),
  hapus: vi.fn(),
}

function renderDenganContext(ui, nilai = nilaiContextDummy) {
  return render(
    <KoleksiContext.Provider value={nilai}>
      <MemoryRouter>{ui}</MemoryRouter>
    </KoleksiContext.Provider>
  )
}

describe('Halaman Beranda', () => {
  it('menampilkan jumlah resep dan jumlah kategori unik', () => {
    renderDenganContext(<Beranda />)
    expect(screen.getByText(/ada 3 resep dalam 2 kategori/i)).toBeInTheDocument()
  })

  it('menampilkan tautan ke halaman koleksi', () => {
    renderDenganContext(<Beranda />)
    expect(screen.getByRole('link', { name: /lihat semua resep/i })).toBeInTheDocument()
  })
})

describe('Beranda saat loading', () => {
  it('menampilkan teks memuat saat loading=true', () => {
    renderDenganContext(<Beranda />, { ...nilaiContextDummy, loading: true, items: [] })
    expect(screen.getByText(/memuat ringkasan/i)).toBeInTheDocument()
  })
})

describe('Halaman Tambah', () => {
  it('menampilkan pesan galat jika judul kurang dari 3 karakter', async () => {
    const user = userEvent.setup()
    renderDenganContext(<Tambah />)
    await user.type(screen.getByLabelText(/judul/i), 'AB')
    await user.click(screen.getByRole('button', { name: /simpan/i }))
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveTextContent(/minimal 3 karakter/i)
  })

  it('memanggil fungsi tambah saat form valid disubmit', async () => {
    const tambahMock = vi.fn()
    const user = userEvent.setup()
    render(
      <KoleksiContext.Provider value={{ ...nilaiContextDummy, tambah: tambahMock }}>
        <MemoryRouter initialEntries={['/tambah']}>
          <Routes>
            <Route path="/tambah" element={<Tambah />} />
            <Route path="/koleksi" element={<div>Koleksi</div>} />
          </Routes>
        </MemoryRouter>
      </KoleksiContext.Provider>
    )
    await user.type(screen.getByLabelText(/judul/i), 'Nasi Goreng Spesial')
    await user.type(screen.getByLabelText(/daerah asal/i), 'Jawa')
    await user.type(screen.getByLabelText(/waktu masak/i), '30')
    await user.click(screen.getByRole('button', { name: /simpan/i }))
    expect(tambahMock).toHaveBeenCalledOnce()
    expect(tambahMock).toHaveBeenCalledWith(
      expect.objectContaining({ judul: 'Nasi Goreng Spesial' })
    )
  })
})

describe('Halaman TidakDitemukan', () => {
  it('menampilkan heading 404 dan tautan kembali ke beranda', () => {
    render(
      <MemoryRouter>
        <TidakDitemukan />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /kembali ke beranda/i })).toBeInTheDocument()
  })
})
