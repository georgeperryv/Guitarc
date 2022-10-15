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

  const [imageArray, setImageArray] = useState([])

  const temp = useRef([])

  //   const toggleImage = c => {
  //     setToggled(!toggled)
  //     if (!temp.current.includes(c.chordImage)) {
  //       temp.current.push(c.chordImage)
  //       setImageArray(temp)
  //     }
  //     console.log('this is temp', temp)
  //     // setImageArray(...imageArray, temp)

  //     setActiveChord(c.chordImage)
  //   }

  const addOrRemoveImage = c => {
    if (temp.current.includes(c.chordImage)) {
      const index = temp.current.indexOf(c.chordImage)
      temp.current.splice(index, 1)
      console.log('temp.current just popped', temp.current)
    } else {
      temp.current.push(c.chordImage)
      console.log('temp.current just pushed', temp.current)
      setActiveChord(c.chordImage)
    }
  }

  const checkImageDisplay = c => {
    if (temp.current.includes(c.chordImage)) {
      console.log('inside the if temp.current', temp.current)
      return false
    } else {
      console.log('inside the else temp.current', temp.current)
      return true
    }
  }

  const chordList = chordsArray.map(c => (
    <li
      id={c.chordName}
      key={c.chordName}
      className={c === activeChord ? 'active' : ''}
      onClick={() => {
        setActiveChord(c)
        addOrRemoveImage(c)
      }}
    >
      {c.name}
      <div>
        {temp.current.includes(c.chordImage) && activeChord === c.chordImage ? (
          //   temp.current.map(i => {
          <img src={`/images/${c.chordImage}`} />
        ) : (
          <h2>False</h2>
        )}
      </div>
    </li>
  ))

  return (
    <>
      <ul className='CategoryList'>{chordList}</ul>
      <div>
        {/* {temp.current.map(imageId => {
          console.log('this is imageIDdd', imageId)
          var li = document.getElementById(imageId)
          console.log('this is li')

          return <img src={`/images/${imageId}`} />
        })} */}
        {/* <img src='/images/31f7b7f02a951db2cce0818a87cb2f01' /> */}
      </div>
    </>
  )
}
