import { useState } from 'react'
import { getToken } from '../../utilities/users-service'
import axios from 'axios'

import * as ChordLibraryPage from '../../pages/ChordLibraryPage/ChordLibraryPage'

async function postImage ({ image, description, activeSong }) {
  const formData = new FormData()
  formData.append('image', image)
  formData.append('description', description)
  formData.append('activeSong', activeSong)

  const token = getToken()
  console.log('this is token', token)
  // const options = 'POST'
  // if (token) {
  const result = await axios.post('/images/song-panel', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  console.log('this is result in the post image fucntion', result)
  console.log('result.data', result.data)
  return result.data
}

export default function ChordSubmitOnSongPanel ({
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
    console.log('result', result)
    setImages([result.imagePath, ...images])
    console.log('images array', images)
  }
  console.log('images array 2', images)
  const fileSelected = event => {
    const file = event.target.files[0]
    setFile(file)
  }

  return (
    <div className='ChordSubmitOnSongPanel'>
      <form onSubmit={submit}>
        <input onChange={fileSelected} type='file' accept='image/*'></input>
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          type='text'
        ></input>
        <button type='submit'>Submit</button>
      </form>
      {images.map(image => (
        <div key={image}>
          {' '}
          <img src={image}></img>
        </div>
      ))}
      {/* <img src='/images/e884075b4d6bf0d5f0cf262c3364f097'></img> */}
    </div>
  )
}
