import './ChordDetail.css'

export default function ChordDetail ({ selected, setSelected }) {
  console.log('inside Chord Detail')
  console.log('this is selected', selected)
  return <ul className='ChordDetail'>{selected}</ul>
}
