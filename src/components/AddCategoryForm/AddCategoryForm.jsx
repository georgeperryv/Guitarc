import { useState, useEffect } from 'react'
import * as SongCollectionPage from '../../pages/SongCollectionPage/SongCollectionPage'
import CategoryList from '../../components/CategoryList/CategoryList'
import * as categoriesAPI from '../../utilities/categories-api'

const AddCategoryForm = ({
  category,
  setCategory,
  setCategoriesRefresh,
  makeUniqueCatMessage,
  setMakeUniqueCatMessage
}) => {
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
      if (typeof newCollection === 'string') {
        setMakeUniqueCatMessage(newCollection)
      } else {
        setMakeUniqueCatMessage('')
      }
      setCategoriesRefresh([1])
      category.category = ''
      // fetchAPI()

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
    <form autoComplete='off' onSubmit={handleAddCollection}>
      <label>Add Category</label>
      <input
        type='text'
        name='category'
        value={category.category}
        onChange={handleChange}
        required
      />
      <h1>{makeUniqueCatMessage}</h1>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default AddCategoryForm
