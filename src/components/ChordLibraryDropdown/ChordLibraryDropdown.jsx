import { useState, useEffect, useRef } from 'react'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './ChordLibraryDropdown.css'
import ChordDetail from '../ChordDetail/ChordDetail'
import * as chordsAPI from '../../utilities/chords-api'

export default function ChordLibraryDropdown ({
  chordsArray,
  setChecked,
  setChordsArray
}) {
  const [selected, setSelected] = useState('')

  const handleChange = event => {
    console.log('handle change', event.value.props)
    setSelected(event.value.props.children[0])
  }

  const handleCheckBox = evt => {
    // setCurrentChordObject(evt.target.checked)
    setChecked([1])
    console.log('this is evt', evt)
    // setCurrentChordName(evt.target.name)
    // console.log('the current chord name', currentChordName)
    //     if (checked === false) {
    //       setLearned('Learned')
    //     } else {
    //       setLearned('Not Learned')
    //     }
    //   }

    console.log('chords array getting passed in', chordsArray)
    const chordList = chordsArray.map(c =>
      c.learned ? (
        <div className='ChordLibraryDropDown' id='greenLabel' key={c.chordName}>
          {c.name}
          {console.log(c.learned)}
        </div>
      ) : (
        <div
          className='ChordLibraryDropDown'
          id='redLabel'
          key={c.chord}
          onClick={() => {}}
        >
          {c.name}
          {console.log(c.learned)}
        </div>
      )
    )
  }

  //   useEffect(
  //     function () {
  //       async function changeLearnedStatus () {
  //         // counter++
  //         // console.log('counter here', counter)
  //         // console.log('the current chord name2', currentChordName)
  //         // const chords = await chordsAPI.changeLearnedStatus(currentChordName)
  //         // setNewChordRefresh([1])
  //         setChordsArray(
  //           chords.reduce((c, item) => {
  //             const chord = item
  //             return c.includes(chord) ? c : [...c, chord]
  //           }, [])
  //         )
  //       }
  //       const myTimeout = setTimeout(changeLearnedStatus, 1000)
  //     },
  //     [checked]
  //   )

  return (
    <>
      <Dropdown
        // value={selected}
        options={chordList}
        onChange={handleChange}
        placeholder='Select a Chord'
      />
      <ChordDetail
        selected={selected}
        setSelected={setSelected}
        chordsArray={chordsArray}
        handleCheckBox={handleCheckBox}
      />
    </>
  )
}
