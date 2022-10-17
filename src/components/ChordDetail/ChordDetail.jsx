// import { useState, useEffect } from 'react'
// import './ChordDetail.css'
// import * as chordsAPI from '../../utilities/chords-api'

// export default function ChordDetail ({
//   selected,
//   setSelected,
//   chordsArray,
//   setChordsArray
// }) {
//   const [checked, setChecked] = useState('')
//   const [learned, setLearned] = useState('')
//   const [currentChordID, setCurrentChordID] = useState('')
//   const [newChordRefresh, setNewChordRefresh] = useState([])
//   const [newChordsArray, setNewChordsArray] = useState([])

//   const handleChange = evt => {
//     setChecked(!checked)
//     console.log('this is evt', evt)
//     setCurrentChordID(evt.target.name)
//     console.log('the current chord name', currentChordID)
//     if (checked === false) {
//       setLearned('Learned')
//     } else {
//       setLearned('Not Learned')
//     }
//   }

//   useEffect(
//     function () {
//       async function changeLearnedStatus () {
//         console.log('the current chord name2', currentChordID)
//         const chords = await chordsAPI.changeLearnedStatus(currentChordID)
//         setNewChordRefresh([1])
//         setNewChordsArray(
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

//   //   function toggleLearned () {
//   //     setLearned({ ...learned } + 1)
//   //     if (learned % 2 === 0) {
//   //       return '<h1>Learned</h1>'
//   //     } else {
//   //       return '<h1>unlearned</h1>'
//   //     }
//   //   }

//   console.log('inside chordr detail chords array', chordsArray)
//   console.log('inside chords detail selected', selected)
//   var index = null
//   for (let i = 0; i < chordsArray.length; i++) {
//     if (chordsArray[i].name === selected.children[0]) {
//       index = i
//     }
//   }
//   //   const index = chordsArray.indexOf(selected)
//   console.log('this is index', index)
//   const desiredChord = chordsArray[index]
//   console.log(desiredChord)

//   return selected ? (
//     <ul className='ChordDetail'>
//       <li>
//         <span>Chord: </span>
//         {desiredChord.name}
//       </li>
//       <li>
//         <span>Learned: </span>
//         {desiredChord.learned.toString()}
//       </li>
//       <div>
//         <label>
//           <input
//             type='checkbox'
//             name={desiredChord._id}
//             checked={checked}
//             onChange={handleChange}
//           />
//           Checkbox
//         </label>
//         <p>Is "My Value" checked? {learned}</p>
//       </div>
//       <li>
//         <span>Number of Saved Songs With This Chord: </span>
//         {desiredChord.song.length}
//       </li>
//       <img src={`/images/${desiredChord.chordImage}`} />
//     </ul>
//   ) : (
//     <h1></h1>
//   )
// }

import { useState, useEffect } from 'react'
import './ChordDetail.css'
import * as chordsAPI from '../../utilities/chords-api'
import { isCompositeComponent } from 'react-dom/test-utils'

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
    <ul className='ChordDetail'>
      <li>
        <span>Chord: </span>
        {desiredChord.name}
      </li>
      <li>
        {/* <span>Learned: </span> */}
        {desiredChord.learned ? (
          <span>You know this chord!</span>
        ) : (
          <span>Haven't mastered this one yet!</span>
        )}
      </li>
      <li>
        {desiredChord.learned ? (
          <label>
            <input
              type='checkbox'
              name={desiredChord._id}
              checked={true}
              onChange={handleChange}
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
              onChange={handleChange}
              value={true}
            />
            Checkbox
          </label>
        )}
        {/* <p>Is "My Value" checked? {desiredChord.learned}</p> */}
      </li>
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
