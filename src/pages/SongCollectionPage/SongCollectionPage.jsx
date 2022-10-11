import { useState, useEffect, useRef } from 'react'
import CategoryList from '../../components/CategoryList/CategoryList'
import * as categoriesAPI from '../../utilities/categories-api'
import AddCategoryForm from '../../components/AddCategoryForm/AddCategoryForm'

export default function SongCollectionPage ({ user, setUser }) {
  const [activeCat, setActiveCat] = useState('')
  const categoriesRef = useRef([])
  const [categoryList, setCategoryList] = useState([])
  const [categoriesArray, setCategoriesArray] = useState([])
  const [category, setCategory] = useState({
    category: ''
  })

  useEffect(function () {
    async function getItems () {
      const items = await categoriesAPI.getAll()
      console.log('this is items', items)
      categoriesRef.current = items.reduce((cats, item) => {
        const cat = item.category
        console.log(cat)
        return cats.includes(cat) ? cats : [...cats, cat]
      }, [])
      setActiveCat(categoriesRef.current[0])
      console.log('categoriesref.current', categoriesRef.current)
      // console.log('categories ref', categoriesRef)
    }
    // setCategoryList(items)

    // setActiveCat(categoriesRef.current[0])
    getItems()
  }, [])

  return (
    <div>
      <aside className='SongCollectionPage'>
        <h1>Song Collection Page</h1>
        <CategoryList
          categories={categoriesRef.current}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
        />
        <AddCategoryForm category={category} setCategory={setCategory} />
      </aside>
    </div>
  )
}
