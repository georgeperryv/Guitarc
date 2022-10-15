import { useState } from 'react'
import { getToken } from '../../utilities/users-service'
import axios from 'axios'

import * as ChordLibraryPage from '../../pages/ChordLibraryPage/ChordLibraryPage'

async function postImage ({ image, description, activeSong, setChordRefresh }) {
  const token = getToken()
  console.log('this is token', token)

  const formData = new FormData()
  formData.append('image', image)
  formData.append('description', description)
  formData.append('activeSong', activeSong)
  formData.append('user', token)

  const result = await axios.post('/images/song-panel', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  return result.data
}

export default function ChordFormSognPanel ({
  activeSong,
  chordRefresh,
  setChordRefresh
}) {
  const [file, setFile] = useState()
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({ image: file, description, activeSong })
    setChordRefresh([1])
    setDescription('')
    console.log('result', result)
    setImages([result.imagePath, ...images])
    console.log('images array', images)
  }

  const fileSelected = event => {
    const file = event.target.files[0]
    setFile(file)
  }

  console.log('images array 2', images)

  return (
    <div className='ChordSubmitOnSongPanel'>
      <form onSubmit={submit}>
        <input onChange={fileSelected} type='file' accept='image/*'></input>
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          type='text'
          required
        ></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
