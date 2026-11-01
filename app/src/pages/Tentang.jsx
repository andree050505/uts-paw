import mahasiswa from '../../mahasiswa.json'

const REPO = 'https://github.com/andree050505/uts-paw'

export default function Tentang() {
  const { nama, nim, kelas, tema } = mahasiswa
  return (
    <section>
      <h1>Tentang</h1>
      <dl>
        <dt>Nama</dt>
        <dd>{nama}</dd>
        <dt>NIM</dt>
        <dd>{nim}</dd>
        <dt>Kelas</dt>
        <dd>{kelas}</dd>
        <dt>Tema</dt>
        <dd>{tema}</dd>
      </dl>
      <p>
        Kode sumber:{' '}
        <a href={REPO} target="_blank" rel="noreferrer">
          {REPO}
        </a>
      </p>
    </section>
  )
}
