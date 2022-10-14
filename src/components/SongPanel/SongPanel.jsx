import ChordLibraryPage from '../../pages/ChordLibraryPage/ChordLibraryPage'

export default function SongPanel ({
  activeSong,
  chordsArray,
  setChordsArray
}) {
  const chordList = ''
  console.log('this is chordsArray', chordsArray)
  if (chordsArray) {
    const chordList = chordsArray.map(c => (
      <li key={c}>
        {c.name}
        <img src={`/images/${c.chordImage}`}></img>
      </li>
    ))
  } else {
    chordList = ''
  }
  return <ul className='CategoryList'>{chordList ? chordList : 'empty'}</ul>
}
