import { useKoleksiContext } from '../context/KoleksiContext.jsx'

// hook untuk akses koleksi resep dari context
export default function useKoleksi() {
  return useKoleksiContext()
}
