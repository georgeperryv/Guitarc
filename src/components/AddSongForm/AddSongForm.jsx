import { useState, useEffect } from 'react'
import * as SongCollectionPage from '../../pages/SongCollectionPage/SongCollectionPage'
import CategoryList from '../../components/CategoryList/CategoryList'
import * as categoriesAPI from '../../utilities/categories-api'
import * as songsAPI from '../../utilities/songs-api'

const AddSongForm = ({ song, setSong }) => {
  //   const [category, setCategory] = useState({
  //     category: ''
  //   })
  function fetchAPI () {
    async function getSongs () {
      const items = await songsAPI.getAll()
      //   setCategoriesList([1])
      console.log('this is items from AddCategoryForm', items)
    }
    getSongs()
  }

  function handleChange (evt) {
    setSong({ ...song, [evt.target.name]: evt.target.value })
  }

  async function handleAddSong (evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault()
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const newCollection = await songsAPI.addSong(song)
      //   fetchAPI()

      // setUser(user)

      //   useEffect(function () {
      //     async function getItems () {
      //       const items = await categoriesAPI.getAll()
      //       console.log('items:', items)
      //     }
      //   }, [])
    } catch {
      console.log('Log In Failed - Try Again')
    }
  }

  return (
    <form autoComplete='off' onSubmit={handleAddSong}>
      <label>Add Song</label>
      <input
        type='text'
        name='song'
        value={song.song}
        onChange={handleChange}
        required
      />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default AddSongForm
