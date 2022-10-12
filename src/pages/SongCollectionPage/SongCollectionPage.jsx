import { useState, useEffect, useRef } from 'react'
import CategoryList from '../../components/CategoryList/CategoryList'
import * as categoriesAPI from '../../utilities/categories-api'
import AddCategoryForm from '../../components/AddCategoryForm/AddCategoryForm'
import SongList from '../../components/SongList/SongList'
import AddSongForm from '../../components/AddSongForm/AddSongForm'

export default function SongCollectionPage ({ user, setUser }) {
  const [activeCat, setActiveCat] = useState('')
  const categoriesRef = useRef([])
  const [categoriesList, setCategoriesList] = useState([])
  const [categoriesArray, setCategoriesArray] = useState([])
  const [category, setCategory] = useState({
    category: ''
  })
  const [song, setSong] = useState({
    song: ''
  })

  useEffect(
    function () {
      async function getItems () {
        const items = await categoriesAPI.getAll()
        // const songs = await songsAPI.getAll()
        // console.log('this is items', items)
        setCategoriesArray(
          items.reduce((cats, item) => {
            const cat = item.category
            return cats.includes(cat) ? cats : [...cats, cat]
          }, [])
        )
        console.log('this is categoriesArray123', categoriesArray)
        setActiveCat(categoriesRef.current[0])
        console.log('categoriesref.current', categoriesRef.current)
        // console.log('categories ref', categoriesRef)
      }
      // setCategoryList(items)

      // setActiveCat(categoriesRef.current[0])
      getItems()
    },
    [categoriesList]
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
          setCategoriesList={setCategoriesList}
        />
      </aside>
      <AddSongForm song={song} setSong={setSong} activeCat={activeCat} />
    </div>
  )
}
