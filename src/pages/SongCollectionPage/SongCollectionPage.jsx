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
import ListGroup from 'react-bootstrap/ListGroup'
import './SongCollectionPage.css'
import Accordion from 'react-bootstrap/Accordion'

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

  const [chordRefresh, setChordRefresh] = useState([])

  const [activeChord, setActiveChord] = useState('')

  const [chordsArray, setChordsArray] = useState([])

  const [independentChordsArray, setIndependentChordsArray] = useState([])

  const [activeChordId, setActiveChordId] = useState('')

  const [attachButton, setAttachButton] = useState([])

  // const [chordRefresh, setChordRefresh] = useState([])

  //useEffect for getting Categories into an array called Categories Array and updating based on categoriesRefresh

  console.log('inside songcolletionpage activeSong', activeSong)

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
        console.log('successfully inside getSongs use effect', activeCat)
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
      const myTimeout = setTimeout(getChords, 1000)
    },
    [activeCat, activeSong, chordRefresh, activeChord]
  )

  useEffect(
    function () {
      async function getIndependentChords () {
        const chords2 = await chordsAPI.getAllIndependentChords()
        console.log('were back with chords33', chords2)
        setIndependentChordsArray(
          chords2.reduce((c, item) => {
            const chord = item
            return c.includes(chord) ? c : [...c, chord]
          }, [])
        )
        console.log(
          'this is the NEWW independentchordsArray',
          independentChordsArray
        )
      }
      const myTimeout = setTimeout(getIndependentChords, 1000)
    },
    [activeCat, activeSong, chordRefresh, activeChord]
  )

  //To add a chord to a song array if submitted

  // const handleAttachButton = event => {
  //   console.log('handle change', event.value.props)
  //   setSelected(event.value.props.children[0])
  // }

  console.log('this is active songggasdsa', activeSong)
  useEffect(
    function () {
      async function attachChord () {
        await chordsAPI.attachChord(activeChordId, activeSong)
        setChordRefresh([1])
      }

      attachChord()
    },
    [attachButton]
  )

  return (
    <>
      <div class='SongCollectionPage'>
        <h1>Song Collection Page</h1>
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>Categories</Accordion.Header>
            <Accordion.Body>
              <div id='Panel1'>
                <ListGroup>
                  <ListGroup.Item>
                    <CategoryList
                      categories={categoriesArray}
                      activeCat={activeCat}
                      setActiveCat={setActiveCat}
                      makeUniqueCatMessage={makeUniqueCatMessage}
                      setMakeUniqueCatMessage={setMakeUniqueCatMessage}
                      setMakeUniqueSongMessage={setMakeUniqueSongMessage}
                      setActiveSong={setActiveSong}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <AddCategoryForm
                      category={category}
                      setCategory={setCategory}
                      setCategoriesRefresh={setCategoriesRefresh}
                      makeUniqueCatMessage={makeUniqueCatMessage}
                      setMakeUniqueCatMessage={setMakeUniqueCatMessage}
                    />
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>Song List</Accordion.Header>
            <Accordion.Body>
              <div id='panel2'>
                {activeCat ? (
                  <>
                    <ListGroup>
                      <ListGroup.Item>
                        <SongList
                          songs={songsArray}
                          activeSong={activeSong}
                          setActiveSong={setActiveSong}
                          makeUniqueSongMessage={makeUniqueSongMessage}
                          setMakeUniqueSongMessage={setMakeUniqueSongMessage}
                        />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <AddSongForm
                          song={song}
                          setSong={setSong}
                          activeCat={activeCat}
                          setSongRefresh={setSongRefresh}
                          makeUniqueSongMessage={makeUniqueSongMessage}
                          setMakeUniqueSongMessage={setMakeUniqueSongMessage}
                        />
                      </ListGroup.Item>
                    </ListGroup>
                  </>
                ) : (
                  <h1></h1>
                )}
              </div>

              {/* <Accordion.Item eventKey='2'>
            <Accordion.Header>Song Panel</Accordion.Header>
            <Accordion.Body> */}
              <div id='panel3'>
                {activeSong ? (
                  <>
                    <ListGroup>
                      <ListGroup.Item>
                        <SongPanel
                          activeSong={activeSong}
                          chordsArray={chordsArray}
                          setChordsArray={setChordsArray}
                          activeChord={activeChord}
                          setActiveChord={setActiveChord}
                          independentChordsArray={independentChordsArray}
                          activeChordId={activeChordId}
                          setActiveChordId={setActiveChordId}
                          attachButton={attachButton}
                          setAttachButton={setAttachButton}
                        />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <ChordFormSongPanel
                          activeSong={activeSong}
                          chordRefresh={chordRefresh}
                          setChordRefresh={setChordRefresh}
                        />
                      </ListGroup.Item>
                    </ListGroup>
                  </>
                ) : (
                  <h1></h1>
                )}
              </div>
              {/* </Accordion.Body>
          </Accordion.Item> */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  )
}
