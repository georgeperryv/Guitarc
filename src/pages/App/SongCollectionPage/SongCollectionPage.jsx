import { useState, useEffect, useRef } from 'react'
import * as collectionsAPI from '../../../utilities/collections-api'

export default function SongCollectionPage ({ user, setUser }) {
  const categoriesRef = useRef([])
  const [category, setCategory] = useState({
    category: ''
  })

  function handleChange (evt) {
    console.log(evt)
    setCategory({ ...category, [evt.target.name]: evt.target.value })
  }

  async function handleAddCollection (evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault()
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      console.log('this is category', category)
      const newCollection = await collectionsAPI.addCollection(category)
      // setUser(user)
      console.log(newCollection)
    } catch {
      console.log('Log In Failed - Try Again')
    }
  }

  return (
    <div className='add-cateogry'>
      <form autoComplete='off' onSubmit={handleAddCollection}>
        <label>Add Category</label>
        <input
          type='text'
          name='category'
          value={category.category}
          onChange={handleChange}
          required
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
