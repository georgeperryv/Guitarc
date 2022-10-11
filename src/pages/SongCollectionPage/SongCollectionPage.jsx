import { useState, useEffect, useRef } from 'react'
import CategoryList from '../../components/CategoryList/CategoryList'
import * as categoriesAPI from '../../utilities/categories-api'
import AddCategoryForm from '../../components/AddCategoryForm/AddCategoryForm'

export default function SongCollectionPage ({ user, setUser }) {
  const [activeCat, setActiveCat] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const categoriesRef = useRef([])

  useEffect(function () {
    async function getItems () {
      const items = await categoriesAPI.getAll()
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
        <AddCategoryForm />
      </aside>
    </div>
  )
}
