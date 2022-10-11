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
      console.log('this is items', items)
      categoriesRef.current = items.reduce((cats, item) => {
        const cat = item.category
        return cats.includes(cat) ? cats : [...cats, cat]
      }, [])
      // console.log('categories ref', categoriesRef)
    }
    // setCategoryList(items)

    setActiveCat(categoriesRef.current[0])
    getItems()
  })

  return (
    <div>
      <aside className='SongCollectionPage'>
        <h1>working</h1>
        <CategoryList />
        <AddCategoryForm />
      </aside>
    </div>
  )
}
