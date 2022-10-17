import { useState, useEffect } from 'react'
import { getToken } from '../../utilities/users-service'
import axios from 'axios'
import SongCollectionPage from '../SongCollectionPage/SongCollectionPage'
import ChordLibraryDropdown from '../../components/ChordLibraryDropdown/ChordLibraryDropdown'
import * as chordsAPI from '../../utilities/chords-api'
import ListGroup from 'react-bootstrap/ListGroup'

import './ChordLibraryPage.css'

async function postImage ({ image, description }) {
  const token = getToken()
  console.log('this is token', token)

  const formData = new FormData()
  formData.append('image', image)
  formData.append('description', description)
  formData.append('user', token)

  const result = await axios.post('/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return result.data
}

export default function ChordLibraryPage (getCategories, chordArray) {
  const [file, setFile] = useState()
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])

  //chords

  const [activeChord, setActiveChord] = useState('')

  const [chordsArray, setChordsArray] = useState([])
  const [chordRefresh, setChordRefresh] = useState(false)

  // const [hasLoaded, setHasLoaded] = useState()

  // const [chordRefresh, setChordRefresh] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({ image: file, description })
    setChordRefresh([1])
    setDescription('')
    // console.log('result', result)
    setImages([result.imagePath, ...images])
    // console.log('images array', images)
  }

  // console.log('images array 2', images)
  const fileSelected = event => {
    const file = event.target.files[0]
    setFile(file)
  }

  useEffect(
    function () {
      async function getChords2 () {
        const chords = await chordsAPI.getAllIndependentChords()
        // console.log('were back with chords', chords)
        setChordsArray(
          chords.reduce((c, item) => {
            const chord = item
            return c.includes(chord) ? c : [...c, chord]
          }, [])
        )
        // console.log('this is the NEWW chordsArray', chordsArray)
      }
      // const myTimeout = setTimeout(getChords2, 1000)
      getChords2()
    },
    [chordRefresh]
  )

  return (
    <>
      <h1 class='title'>Song Collection Page</h1>
      <div class='ChordLibraryPage'>
        <ListGroup>
          <ListGroup.Item class='dropdown-and-detail'>
            <div>
              <ChordLibraryDropdown
                chordsArray={chordsArray}
                chordRefresh={chordRefresh}
                setChordRefresh={setChordRefresh}
              />
            </div>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item>
            <div id='librarySubmit'>
              <form onSubmit={submit}>
                <input
                  onChange={fileSelected}
                  type='file'
                  accept='image/*'
                ></input>
                <input
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  type='text'
                  required
                  placeholder='Type Chord Name'
                ></input>
                <button type='submit'>Add Chord</button>
              </form>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  )
}
