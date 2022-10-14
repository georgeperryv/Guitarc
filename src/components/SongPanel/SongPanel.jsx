import ChordLibraryPage from '../../pages/ChordLibraryPage/ChordLibraryPage'

export default function SongPanel ({
  activeSong,
  chordsArray,
  setChordsArray
}) {
  const songList = chordsArray.map(c => (
    <li
      key={c}
      //   className={c === activeSong ? 'active' : ''}
      // FYI, the below will also work, but will give a warning
      // className={cat === activeCat && 'active'}
      //   onClick={() => {
      //     setActiveSong(s)
      //     setMakeUniqueSongMessage('')
      //   }}
    >
      {c.name}
      <img src={`/images/${c.chordImage}`}></img>
    </li>
  ))
  return <ul className='CategoryList'>{songList}</ul>
}
