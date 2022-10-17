import { useState, useEffect, useRef } from 'react'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './ChordLibraryDropdown.css'
import ChordDetail from '../ChordDetail/ChordDetail'

export default function ChordLibraryDropdown ({
  chordsArray,
  chordRefresh,
  setChordRefresh
}) {
  const [selected, setSelected] = useState('')
  const [isLearned, setIsLearned] = useState(false)

  const handleChange = event => {
    console.log('handle change', event.value.props)
    setSelected(event.value.props.children)
  }

  console.log('ChordLibraryDropdown - chordsArray', chordsArray)
  console.log('selected', selected)

  useEffect(() => {
    var index = null
    for (let i = 0; i < chordsArray.length; i++) {
      if (chordsArray[i].name === selected) {
        index = i
      }
    }
    index && setIsLearned(chordsArray[index].learned)
  }, [selected])

  return (
    <>
      <Dropdown
        value={
          // <div
          //   className='ChordLibraryDropDown'
          //   label={<div>HELLO</div>}
          //   value='hello'
          //   id={isLearned ? 'greenLabel' : 'redLabel'}
          // >
          //   Hello
          // </div>
          selected
        }
        placeholderClassName='ChordLibraryDropDownP'
        options={chordsArray.map(c => (
          <div
            className='ChordLibraryDropDown'
            id={c.learned ? 'greenLabel' : 'redLabel'}
            key={c.chordName}
          >
            {c.name}
          </div>
        ))}
        onChange={handleChange}
        placeholder='Select a Chord'
      />
      <ChordDetail
        selected={selected}
        setSelected={setSelected}
        chordsArray={chordsArray}
        chordRefresh={chordRefresh}
        setChordRefresh={setChordRefresh}
      />
    </>
  )
}
