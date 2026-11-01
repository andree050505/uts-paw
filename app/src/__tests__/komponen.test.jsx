import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import KartuItem from '../components/KartuItem.jsx'
import KotakPencarian from '../components/KotakPencarian.jsx'

const itemContoh = {
  id: 1,
  judul: 'Rendang Daging Sapi',
  kategori: 'Makanan Utama',
  daerahAsal: 'Sumatera Barat',
  waktuMasak: 180,
  tingkatKesulitan: 'sulit',
}

describe('KartuItem', () => {
  it('menampilkan judul resep sebagai tautan', () => {
    render(
      <MemoryRouter>
        <KartuItem item={itemContoh} />
      </MemoryRouter>
    )
    const tautan = screen.getByRole('link', { name: /rendang daging sapi/i })
    expect(tautan).toBeInTheDocument()
    expect(tautan).toHaveAttribute('href', '/koleksi/1')
  })

  it('menampilkan kategori dan daerah asal resep', () => {
    render(
      <MemoryRouter>
        <KartuItem item={itemContoh} />
      </MemoryRouter>
    )
    expect(screen.getByText(/makanan utama/i)).toBeInTheDocument()
    expect(screen.getByText(/sumatera barat/i)).toBeInTheDocument()
  })
})

describe('KotakPencarian', () => {
  it('merender input pencarian dengan placeholder yang benar', () => {
    render(<KotakPencarian nilai="" onUbah={vi.fn()} />)
    const input = screen.getByRole('searchbox', { name: /cari judul/i })
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Cari judul...')
  })

  it('memanggil callback onUbah saat pengguna mengetik', async () => {
    const user = userEvent.setup()
    const mockUbah = vi.fn()
    render(<KotakPencarian nilai="" onUbah={mockUbah} />)
    const input = screen.getByRole('searchbox')
    await user.type(input, 'soto')
    expect(mockUbah).toHaveBeenCalledTimes(4)
  })
})
