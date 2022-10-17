import ChordLibraryPage from '../../pages/ChordLibraryPage/ChordLibraryPage'
import { useState, useEffect, useRef } from 'react'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

export default function SongPanel ({
  activeSong,
  chordsArray,
  setChordsArray,
  activeChord,
  setActiveChord,
  independentChordsArray,
  activeChordId,
  setActiveChordId,
  setAttachButton,
  attachButton
}) {
  const [toggled, setToggled] = useState([])

  const [imageArray, setImageArray] = useState([])

  const [arrayOfSongIds, setArrayOfSongIds] = useState([])

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

  console.log('this is the NEWEST activeChordId', activeChordId)
  //   console.log('this is the NSDFDSFFSDFF active song', activeSong)

  const updateCurrentId = evt => {
    console.log(evt)
    setActiveChordId(evt.value.props.id)
    console.log('this is the NEWEST2 activeChord', activeChordId)
  }

  const addOrRemoveImage = c => {
    if (temp.current.includes(c.chordImage)) {
      const index = temp.current.indexOf(c.chordImage)
      temp.current.splice(index, 1)
      //   setChordRefresh([1])
      console.log('temp.current just popped', temp.current)
    } else {
      temp.current.push(c.chordImage)
      console.log('temp.current just pushed', temp.current)
      //   setChordRefresh([1])
      setActiveChord(c.chordImage)
    }
  }

  const handleOnClick = () => {
    setAttachButton([1])
  }

  const chordsList = chordsArray.map(c => (
    <li
      id={c._id}
      key={c.chordName}
      className={c === activeChord ? 'active' : ''}
      onClick={() => {
        // setChordRefresh([1])
        console.log('this is c', c)
        // setActiveChordId(c._id)
        setActiveChord([1])
        addOrRemoveImage(c)
      }}
    >
      {c.name}
      <div>
        {console.log('this is temp.current', temp.current)}
        {temp.current.includes(c.chordImage) ? (
          <img src={`/images/${c.chordImage}`} />
        ) : (
          ''
        )}
      </div>
    </li>
  ))

  //   for (x =0; x < chordsArray.length, x++){
  //     console.log('hello')
  //   }

  console.log('this is chordsList', chordsList)

  const independentChordsList = independentChordsArray.map(a => (
    <li
      id={a._id}
      key={a.name}
      className={a === activeChord ? 'active' : ''}
      onClick={() => {
        // setActiveChord(a)
        // addOrRemoveImage(a)
      }}
    >
      {a.name}
      {/* <div>
        {console.log('this is temp.current', temp.current)}
        {temp.current.includes(a.chordImage) ? (
          <img src={`/images/${a.chordImage}`} />
        ) : (
          ''
        )}
      </div> */}
    </li>
  ))

  //   console.log('ACTIVE CHORD', activeChord)

  const options = ['one', 'two', 'three']
  return (
    <>
      <Dropdown
        options={independentChordsList}
        placeholder='Select a Chord to Add'
        onChange={updateCurrentId}
      />
      <ul className='CategoryList'>{chordsList}</ul>
      <button onClick={handleOnClick}>Default</button>;
    </>
  )
}
