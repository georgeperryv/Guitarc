import ChordLibraryPage from '../../pages/ChordLibraryPage/ChordLibraryPage'
import { useState, useEffect, useRef } from 'react'

export default function SongPanel ({
  activeSong,
  chordsArray,
  setChordsArray,
  activeChord,
  setActiveChord
}) {
  const [toggled, setToggled] = useState([])

  const toggleImage = c => {
    setToggled(!toggled)
    setActiveChord(c.chordImage)
  }

  const chordList = chordsArray.map(c => (
    <li
      key={c._id}
      className={c === activeChord ? 'active' : ''}
      onClick={() => {
        setActiveChord(c)
        toggleImage(c)
      }}
    >
      {c.name}
      <div>
        {toggled && activeChord === c.chordImage ? (
          <img src={`/images/${activeChord}`} />
        ) : (
          ''
        )}
      </div>
    </li>
  ))

  return (
    <>
      <ul className='CategoryList'>{chordList}</ul>
    </>
  )
}
