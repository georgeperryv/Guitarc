import { useState, useEffect, useRef } from 'react'
import CategoryList from '../../components/CategoryList/CategoryList'
import * as categoriesAPI from '../../utilities/categories-api'
import * as songsAPI from '../../utilities/songs-api'
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

  //Passed down to the songs list, this is an array of all of the current songs from the API
  const [songsArray, setSongsArray] = useState([])

  const [songRefresh, setSongRefresh] = useState([])

  const [song, setSong] = useState({
    song: ''
  })

  //useEffect for getting Categories into an array called Categories Array and updating based on categoriesRefresh
  useEffect(
    function () {
      async function getCategories () {
        const categories = await categoriesAPI.getAll()
        setCategoriesArray(
          categories.reduce((cats, item) => {
            const cat = item.category
            return cats.includes(cat) ? cats : [...cats, cat]
          }, [])
        )
      }

      getCategories()
    },
    [categoriesRefresh]
  )

  //useEffect for getting Songs into an array called Songs Array and updating based on songsRefresh
  useEffect(
    function () {
      async function getSongs () {
        const songs = await songsAPI.getSongsFromCategory(activeCat)
        console.log('were back with songs', songs)
        setSongsArray(
          songs.reduce((songs, item) => {
            const song = item.category
            return songs.includes(song) ? songs : [...songs, song]
          }, [])
        )
      }

      getSongs()
    },
    [activeCat, songRefresh]
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
