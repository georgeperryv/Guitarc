import { useState, useEffect, useRef } from 'react'
import CategoryList from '../../components/CategoryList/CategoryList'
import * as categoriesAPI from '../../utilities/categories-api'
import * as songsAPI from '../../utilities/songs-api'
import * as chordsAPI from '../../utilities/chords-api'
import AddCategoryForm from '../../components/AddCategoryForm/AddCategoryForm'
import SongList from '../../components/SongList/SongList'
import AddSongForm from '../../components/AddSongForm/AddSongForm'
import SongPanel from '../../components/SongPanel/SongPanel'
import ChordFormSongPanel from '../../components/ChordFormSongPanel/ChordFormSongPanel'

export default function SongCollectionPage ({ user, setUser }) {
  //Category name of whatever is currently clicked. This is passed down to the category list
  const [activeCat, setActiveCat] = useState('')

  //Also passed down to the category list, this is an array of all of the current categories from the API
  const [categoriesArray, setCategoriesArray] = useState([])

  //In order for the useEffect to update and pull all of the categories when something is submitted,
  //I pass a use state down to the form, update it arbitrarily whenever the form is submitted,
  //and put that in the dependency array on this page so useEffect will refresh
  const [categoriesRefresh, setCategoriesRefresh] = useState([])

  //Message prompt to enter a unique category if the user tries to repeat a category
  const [makeUniqueCatMessage, setMakeUniqueCatMessage] = useState('')

  //Passed down to the category form to create a new category
  const [category, setCategory] = useState({
    category: ''
  })

  //Songs
  //Passed down to the songs list, this is an array of all of the current songs from the API
  const [activeSong, setActiveSong] = useState('')

  const [songsArray, setSongsArray] = useState([])

  const [songRefresh, setSongRefresh] = useState([])

  //Message prompt to enter a unique song if the user tries to repeat a song
  const [makeUniqueSongMessage, setMakeUniqueSongMessage] = useState('')

  const [song, setSong] = useState({
    song: ''
  })

  //chords

  const [activeChord, setActiveChord] = useState('')

  const [chordsArray, setChordsArray] = useState([])

  const [chordRefresh, setChordRefresh] = useState([])

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
          songs.reduce((s, item) => {
            const song = item.song
            return s.includes(song) ? s : [...s, song]
          }, [])
        )
      }

      getSongs()
    },
    [activeCat, songRefresh]
  )

  //useEffect for updating the chord images that belong to a song every time chord refresh state is updated
  useEffect(
    function () {
      async function getChords () {
        const chords = await chordsAPI.getAllChords(activeSong)
        console.log('were back with chords', chords)
        setChordsArray(
          chords.reduce((c, item) => {
            const chord = item
            return c.includes(chord) ? c : [...c, chord]
          }, [])
        )
        console.log('this is the NEWW chordsArray', chordsArray)
      }
      const myTimeout = setTimeout(getChords, 10)
    },
    [activeCat, activeSong, chordRefresh, activeChord]
  )

  return (
    <div>
      <aside className='SongCollectionPage'>
        <h1>Song Collection Page</h1>
        <CategoryList
          categories={categoriesArray}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
          makeUniqueCatMessage={makeUniqueCatMessage}
          setMakeUniqueCatMessage={setMakeUniqueCatMessage}
          setMakeUniqueSongMessage={setMakeUniqueSongMessage}
          setActiveSong={setActiveSong}
        />
        <AddCategoryForm
          category={category}
          setCategory={setCategory}
          setCategoriesRefresh={setCategoriesRefresh}
          makeUniqueCatMessage={makeUniqueCatMessage}
          setMakeUniqueCatMessage={setMakeUniqueCatMessage}
        />
      </aside>
      <div>
        {activeCat ? (
          <>
            <SongList
              songs={songsArray}
              activeSong={activeSong}
              setActiveSong={setActiveSong}
              makeUniqueSongMessage={makeUniqueSongMessage}
              setMakeUniqueSongMessage={setMakeUniqueSongMessage}
            />
            <AddSongForm
              song={song}
              setSong={setSong}
              activeCat={activeCat}
              setSongRefresh={setSongRefresh}
              makeUniqueSongMessage={makeUniqueSongMessage}
              setMakeUniqueSongMessage={setMakeUniqueSongMessage}
            />
          </>
        ) : (
          <h1></h1>
        )}
      </div>
      {activeSong ? (
        <>
          <SongPanel
            activeSong={activeSong}
            chordsArray={chordsArray}
            setChordsArray={setChordsArray}
            activeChord={activeChord}
            setActiveChord={setActiveChord}
            chordRefresh={chordRefresh}
            setChordRefresh={setChordRefresh}
          />
          <ChordFormSongPanel
            activeSong={activeSong}
            chordRefresh={chordRefresh}
            setChordRefresh={setChordRefresh}
          />
        </>
      ) : (
        <h1></h1>
      )}
    </div>
  )
}
