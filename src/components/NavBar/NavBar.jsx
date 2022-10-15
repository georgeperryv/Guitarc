import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'

export default function NavBar ({ user, setUser, setChordRefresh }) {
  function handleLogOut () {
    userService.logOut()
    setUser(null)
  }

  const refresh = event => {
    setChordRefresh([1])
  }

  return (
    <nav>
      <Link onClick={refresh} to='/chord-library'>
        Chord Library
      </Link>
      &nbsp; | &nbsp;
      <Link onClick={refresh} to='/song-collection'>
        Song Collection
      </Link>
      &nbsp; | &nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;{' '}
      <Link to={''} onClick={handleLogOut}>
        Logout
      </Link>
    </nav>
  )
}
