import { useState, useEffect } from 'react'
import './ChordDetail.css'
import * as chordsAPI from '../../utilities/chords-api'
import { isCompositeComponent } from 'react-dom/test-utils'
import ListGroup from 'react-bootstrap/ListGroup'

export default function ChordDetail ({
  selected,
  setSelected,
  chordsArray,
  setChordsArray,
  chordRefresh,
  setChordRefresh
}) {
  const [checked, setChecked] = useState(false)
  // const [learned, setLearned] = useState('')
  // const [currentChordID, setCurrentChordID] = useState('')
  const [newChordRefresh, setNewChordRefresh] = useState([])
  const [newChordsArray, setNewChordsArray] = useState([])

  // console.log('inside chordr detail chords array', chordsArray)
  // console.log('inside chords detail selected', selected)
  var index = null
  for (let i = 0; i < chordsArray.length; i++) {
    if (chordsArray[i].name === selected) {
      index = i
    }
  }
  const desiredChord = chordsArray[index]

  //   const index = chordsArray.indexOf(selected)
  // console.log('chordsArray', chordsArray)
  // console.log('index', index)
  // console.log('selected', selected)

  // console.log(desiredChord)
  const handleChange = evt => {
    // console.log('0')
    // setCurrentChordID(evt.target.name)
    // console.log('1')
    setChecked(!checked)
    // console.log('this is evt', evt)
    // console.log('the current chord name', currentChordID)
    // if (checked === false) {
    //   setLearned('Learned')
    // } else {
    //   setLearned('Not Learned')
    // }
  }

  useEffect(
    function () {
      // console.log('checked changed to', checked)
      async function changeLearnedStatus () {
        // console.log('2')
        console.log('CHANGING LEARNED STATUS', desiredChord._id)
        await chordsAPI.changeLearnedStatus(desiredChord._id)
        // setNewChordRefresh([1])
        // setNewChordsArray(
        //   chords.reduce((c, item) => {
        //     const chord = item
        //     return c.includes(chord) ? c : [...c, chord]
        //   }, [])
        // )
        // console.log('3')
        setChordRefresh(!chordRefresh)
      }
      // const myTimeout = setTimeout(changeLearnedStatus, 1000)
      changeLearnedStatus()
    },
    [checked]
  )

  return selected ? (
    <ListGroup class='ChordDetailPanel'>
      <ListGroup.Item class='list-group-item-library'>
        <div id='chordTitle'>{desiredChord.name}</div>
        <div>
          {desiredChord.learned ? (
            <span class='greenChord'>You know this chord!</span>
          ) : (
            <span class='redChord'>Haven't mastered this one yet!</span>
          )}
        </div>
        <div>
          {desiredChord.learned ? (
            <div class='checkBox'>
              <label class='label'>
                <span class='span'>Check Once You've Learned This Chord: </span>
                <input
                  type='checkbox'
                  name={desiredChord._id}
                  checked={true}
                  onChange={handleChange}
                  value={true}
                />
              </label>
            </div>
          ) : (
            <div class='checkBox'>
              <label class='label'>
                <span class='span'>Check Once You've Learned This Chord: </span>
                <input
                  type='checkbox'
                  name={desiredChord._id}
                  checked={false}
                  onChange={handleChange}
                  value={true}
                />
              </label>
            </div>
          )}
        </div>
        <div>
          <span>Number of Saved Songs With This Chord: </span>
          {desiredChord.song.length}
        </div>
        <img id='libraryChordPic' src={`/images/${desiredChord.chordImage}`} />
        {/* </ul> */}
      </ListGroup.Item>
    </ListGroup>
  ) : (
    <h1></h1>
  )
}
