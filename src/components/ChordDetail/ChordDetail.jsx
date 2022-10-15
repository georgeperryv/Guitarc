import './ChordDetail.css'

export default function ChordDetail ({ selected, setSelected, chordsArray }) {
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
  console.log(desiredChord)

  return selected ? (
    <ul className='ChordDetail'>
      <li>
        <span>Chord: </span>
        {desiredChord.name}
      </li>
      <li>
        <span>Learned: </span>
        {desiredChord.learned.toString()}
      </li>
      <li>
        <span>Number of Saved Songs With This Chord: </span>
        {desiredChord.song.length}
      </li>
      <img src={`/images/${desiredChord.chordImage}`} />
    </ul>
  ) : (
    <h1>hello</h1>
  )
}
