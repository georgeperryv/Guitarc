import ChordLibraryPage from '../../pages/ChordLibraryPage/ChordLibraryPage'

export default function SongPanel ({
  activeSong,
  chordsArray,
  setChordsArray
}) {
  console.log('this is chordsArray', chordsArray)
  const chordList = chordsArray.map(c => (
    <li key={c._id}>
      {c.name}
      <img src={`/images/${c.chordImage}`}></img>
    </li>
  ))

  return <ul className='CategoryList'>{chordList}</ul>
}
