import './App.css'
import { useState } from 'react'
// Import the following components
import AuthPage from '../AuthPage/AuthPage'
import ChordLibraryPage from '../ChordLibraryPage/ChordLibraryPage'
import SongCollectionPage from '../SongCollectionPage/SongCollectionPage'
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage'
import { Routes, Route } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import { getUser } from '../../utilities/users-service'
import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
  // set the user by calling getUser function
  const [user, setUser] = useState(getUser())
  const [chordRefresh, setChordRefresh] = useState([])

  return (
    <main className='App'>
      {user ? (
        <>
          <NavBar
            user={user}
            setUser={setUser}
            chordRefresh={chordRefresh}
            setChordRefresh={setChordRefresh}
          />
          <Routes>
            <Route
              path='/chord-library'
              element={
                <ChordLibraryPage
                  chordRefresh={chordRefresh}
                  setChordRefresh={setChordRefresh}
                />
              }
            />
            <Route
              path='/song-collection'
              element={
                <SongCollectionPage
                  chordRefresh={chordRefresh}
                  setChordRefresh={setChordRefresh}
                />
              }
            />
            <Route path='/orders' element={<OrderHistoryPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  )
}

export default App
