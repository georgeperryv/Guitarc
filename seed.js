require('dotenv').config()
require('./config/database')

const Chord = require('./models/chord')

;(async function () {
  await Chord.deleteMany({})
  const chords = await Chord.create([
    {
      name: 'A Major',
      chordImage: 'Screen Shot 2022-10-15 at 10.46.19 AM.png',
      learned: false
    }
  ])

  process.exit()
})()
