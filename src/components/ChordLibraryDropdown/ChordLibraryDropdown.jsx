import { useState, useEffect, useRef } from 'react'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

export default function ChordLibraryDropdown ({
  chordsArray,
  chordRefresh,
  setChordRefresh
}) {
  //   const [toggled, setToggled] = useState([])

  //   const [imageArray, setImageArray] = useState([])

  //   const temp = useRef([])

  //   //   const toggleImage = c => {
  //   //     setToggled(!toggled)
  //   //     if (!temp.current.includes(c.chordImage)) {
  //   //       temp.current.push(c.chordImage)
  //   //       setImageArray(temp)
  //   //     }
  //   //     console.log('this is temp', temp)
  //   //     // setImageArray(...imageArray, temp)

  //   //     setActiveChord(c.chordImage)
  //   //   }

  //   const addOrRemoveImage = c => {
  //     if (temp.current.includes(c.chordImage)) {
  //       const index = temp.current.indexOf(c.chordImage)
  //       temp.current.splice(index, 1)
  //       //   setChordRefresh([1])
  //       console.log('temp.current just popped', temp.current)
  //     } else {
  //       temp.current.push(c.chordImage)
  //       console.log('temp.current just pushed', temp.current)
  //       //   setChordRefresh([1])
  //       setActiveChord(c.chordImage)
  //     }
  //   }

  //   //   const checkImageDisplay = c => {
  //   //     if (temp.current.includes(c.chordImage)) {
  //   //       console.log('inside the if temp.current', temp.current)
  //   //       return false
  //   //     } else {
  //   //       console.log('inside the else temp.current', temp.current)
  //   //       return true
  //   //     }
  //   //   }
  console.log('chords array getting passed in', chordsArray)
  const chordList = chordsArray.map(c => (
    <li
      id={c.chordName}
      key={c.chordName}
      // className={c === activeChord ? 'active' : ''}
      onClick={() => {
        // setChordRefresh([1])
        //   setActiveChord(c)
        //   addOrRemoveImage(c)
      }}
    >
      {c.name}
      {/* <div>
          {console.log('this is temp.current', temp.current)}
          {temp.current.includes(c.chordImage) ? (
            <img src={`/images/${c.chordImage}`} />
          ) : (
            ''
          )}
        </div> */}
    </li>
  ))

  //   const options = ['one', 'two', 'three']
  return (
    <>
      {/* <Dropdown options={options} value={5} placeholder='Select an option' /> */}
      <ul className='CategoryList'>{chordList}</ul>
    </>
  )
}
