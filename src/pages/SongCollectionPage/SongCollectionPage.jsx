import { useState, useEffect, useRef } from 'react'
import CategoryList from '../../components/CategoryList/CategoryList'
import * as categoriesAPI from '../../utilities/categories-api'
import AddCategoryForm from '../../components/AddCategoryForm/AddCategoryForm'
import SongList from '../../components/SongList/SongList'
import AddSongForm from '../../components/AddSongForm/AddSongForm'

export default function SongCollectionPage ({ user, setUser }) {
  //Category name of whatever is currently clicked. This is passed down to the category list
  const [activeCat, setActiveCat] = useState('')

  //Also passed down to the category list, this is an array of all of the current categories from the API
  const [categoriesArray, setCategoriesArray] = useState([])

  //In order for the useEffect to update and pull all of the categories when something is submitted,
  //I pass a use state down to the form, update it arbitrarily whenever the form is submitted,
  //and put that in the dependency array on this page so useEffect will refresh
  const [categoriesRefresh, setCategoriesRefresh] = useState([])

  //Passed down to the category form to create a new category
  const [category, setCategory] = useState({
    category: ''
  })

  const [song, setSong] = useState({
    song: ''
  })

  useEffect(
    function () {
      async function getItems () {
        const categories = await categoriesAPI.getAll()
        setCategoriesArray(
          categories.reduce((cats, item) => {
            const cat = item.category
            return cats.includes(cat) ? cats : [...cats, cat]
          }, [])
        )
      }

      getItems()
    },
    [categoriesRefresh]
  )

  return (
    <div>
      <aside className='SongCollectionPage'>
        <h1>Song Collection Page</h1>
        <CategoryList
          categories={categoriesArray}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
        />
        <AddCategoryForm
          category={category}
          setCategory={setCategory}
          setCategoriesRefresh={setCategoriesRefresh}
        />
      </aside>
      <SongList />
      <AddSongForm song={song} setSong={setSong} activeCat={activeCat} />
    </div>
  )
}
