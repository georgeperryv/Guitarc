import { useState, useEffect, useRef } from 'react'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './ChordLibraryDropdown.css'
import ChordDetail from '../ChordDetail/ChordDetail'

export default function ChordLibraryDropdown ({ chordsArray }) {
  const [selected, setSelected] = useState('')

  const handleChange = event => {
    console.log('hi')
    console.log('handle change', event.value.props.children[0])
    setSelected(event.value.props.children[0])
  }

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

  return (
    <>
      <Dropdown
        // value={selected}
        options={chordList}
        onChange={handleChange}
        placeholder='Select an option'
      />
      <ChordDetail selected={selected} setSelected={setSelected} />
    </>
  )
}
