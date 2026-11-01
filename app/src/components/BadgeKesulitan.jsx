export default function BadgeKesulitan({ tingkat }) {
  return (
    <span className={`badge badge-${tingkat}`}>
      {tingkat}
    </span>
  )
}
