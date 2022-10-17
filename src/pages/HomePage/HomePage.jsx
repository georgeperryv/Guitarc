import ListGroup from 'react-bootstrap/ListGroup'
import './HomePage.css'

export default function HomePage () {
  return (
    <ListGroup>
      <ListGroup.Item>
        <h1> Welcome to Guitarc!</h1>
        <span class='intro-text'>
          Guitarc is designed to help guitarists organize their musical journey.
          You will have the ability to save and update chords as you learn them
          by attaching finger positioning images to the "Chord Library" page.
          You will also be able to create a collection of songs you have
          learned/are practicing with the option to attach Chords from your
          Chorld Library. Start your journey by navigating to either "Chord
          Library" or "Song Collection" above!
        </span>
      </ListGroup.Item>
    </ListGroup>
  )
}
