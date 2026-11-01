import { Link } from 'react-router-dom'

export default function KartuItem({ item }) {
  const { id, judul, kategori, daerahAsal } = item
  return (
    <article className="kartu">
      <h3>
        <Link to={`/koleksi/${id}`}>{judul}</Link>
      </h3>
      <p>
        {kategori} · {daerahAsal}
      </p>
    </article>
  )
}
