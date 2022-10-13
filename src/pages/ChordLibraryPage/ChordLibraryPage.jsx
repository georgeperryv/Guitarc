import { useState } from 'react'
import axios from 'axios'

import './ChordLibraryPage.css'

async function postImage ({ image, description }) {
  const formData = new FormData()
  formData.append('image', image)
  formData.append('description', description)

  const result = await axios.post('/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return result.data
}

export default function ChordLibraryPage () {
  const [file, setFile] = useState()
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({ image: file, description })
    console.log('result', result)
    await setImages([result.imagePath, ...images])
    console.log('images array', images)
  }
  console.log('images array 2', images)
  const fileSelected = event => {
    const file = event.target.files[0]
    setFile(file)
  }

  return (
    <div className='ChordLibraryPage'>
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
    </div>
  )
}
