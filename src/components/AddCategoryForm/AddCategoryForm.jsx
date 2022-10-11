import { useState } from 'react'
import * as SongCollectionPage from '../../pages/SongCollectionPage/SongCollectionPage'
import CategoryList from '../../components/CategoryList/CategoryList'
import * as categoriesAPI from '../../utilities/categories-api'

export default function AddCategoryForm ({}) {
  const [category, setCategory] = useState({
    category: ''
  })

  function handleChange (evt) {
    setCategory({ ...category, [evt.target.name]: evt.target.value })
  }

  async function handleAddCollection (evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault()
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const newCollection = await categoriesAPI.addCategory(category)
      // setUser(user)
      alert(newCollection.category)
    } catch {
      console.log('Log In Failed - Try Again')
    }
  }

  return (
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
  )
}
