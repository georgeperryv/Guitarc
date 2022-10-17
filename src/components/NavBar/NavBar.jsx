import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './NavBar.css'

export default function NavBar ({ user, setUser, setChordRefresh }) {
  function handleLogOut () {
    userService.logOut()
    setUser(null)
  }

  const refresh = event => {
    setChordRefresh([1])
  }

  return (
    // <Navbar bg='' expand='lg' fixed='top'>
    //   <Container>
    //     <Navbar.Brand style={{ fontFamily: 'Peralta' }} href='/'>
    //       Guitarc
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls='basic-navbar-nav' />
    //     <Navbar.Collapse id='basic-navbar-nav'>
    //       <Nav className='me-auto'>
    //         <Nav.Link onClick={refresh} href='/chord-library'>
    //           Chord Library
    //         </Nav.Link>
    //         <Nav.Link onClick={refresh} href='/song-collection'>
    //           Song Colletion
    //         </Nav.Link>
    //       </Nav>
    //       <Nav className='ml-auto'>
    //         <Nav.Link href={''} onClick={handleLogOut}>
    //           Logout
    //         </Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <nav>
      <Link class='nav-format' onClick={refresh} to='/chord-library'>
        Chord Library
      </Link>
      &nbsp; <span class='nav-format'>|</span> &nbsp;
      <Link class='nav-format' onClick={refresh} to='/song-collection'>
        Song Collection
      </Link>
      &nbsp; <span class='nav-format'>|</span> &nbsp;
      <span class='nav-format'>Welcome, {user.name}</span>
      &nbsp;<span class='nav-format'>|</span> &nbsp;
      <Link class='nav-format' to={''} onClick={handleLogOut}>
        Logout
      </Link>
    </nav>
  )
}
