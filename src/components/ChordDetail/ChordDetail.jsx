import { useState, useEffect } from 'react'
import './ChordDetail.css'
import * as chordsAPI from '../../utilities/chords-api'

export default function ChordDetail ({
  selected,
  setSelected,
  chordsArray,
  setChordsArray,
  handleCheckBox
}) {
  const [learned, setLearned] = useState()
  const [currentChordName, setCurrentChordName] = useState('')
  const [currentChordObject, setCurrentChordObject] = useState({})
  const [newChordRefresh, setNewChordRefresh] = useState([])
  const [newChordsArray, setNewChordsArray] = useState([])

  var counter = 0

  console.log('inside chordr detail chords array', chordsArray)
  console.log('inside chords detail selected', selected)
  var index = null
  for (let i = 0; i < chordsArray.length; i++) {
    if (chordsArray[i].name === selected) {
      index = i
    }
  }
  //   const index = chordsArray.indexOf(selected)
  console.log('this is index', index)
  const desiredChord = chordsArray[index]
  //

  // setLearned(desiredChord.learned.toString())
  console.log('this is desired Chord', desiredChord)
  // if (desiredChord) {
  //   if (desiredChord.learned.toString()) {
  //     setLearned(true)
  //   } else {
  //     setLearned(false)
  //   }
  // }

  console.log(desiredChord)

  return selected && counter === 0 ? (
    <ul className='ChordDetail'>
      <li>
        <span>Chord: </span>
        {desiredChord.name}
      </li>
      <li>
        <span>Learned: </span>
        {desiredChord.learned.toString()}
      </li>
      <div>
        {desiredChord.learned ? (
          <label>
            <input
              type='checkbox'
              name={desiredChord._id}
              checked={true}
              onChange={handleCheckBox}
              value={true}
            />
            Checkbox
          </label>
        ) : (
          <label>
            <input
              type='checkbox'
              name={desiredChord._id}
              checked={false}
              onChange={handleCheckBox}
              value={true}
            />
            Checkbox
          </label>
        )}
        <p>Is "My Value" checked? {learned}</p>
      </div>
      <li>
        <span>Number of Saved Songs With This Chord: </span>
        {desiredChord.song.length}
      </li>
      <img src={`/images/${desiredChord.chordImage}`} />
    </ul>
  ) : (
    <h1></h1>
  )
}
