const express = require('express')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const Chord = require('./models/chord')
const Song = require('./models/song')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('./s3')

const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')

// Always require and configure near the top
require('dotenv').config()
// Connect to the database
require('./config/database')

// Local variables will come in handy for holding retrieved documents
let user, item, category, order
let users, items, categories, orders

const app = express()

app.use(logger('dev'))
app.use(express.json())

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'build')))
app.use(require('./config/checkToken'))

// http://localhost:3001/api/users
app.use('/api/users', require('./routes/api/users'))
const ensureLoggedIn = require('./config/ensureLoggedIn')
app.use('/api/categories', ensureLoggedIn, require('./routes/api/category'))
app.use('/api/songs', ensureLoggedIn, require('./routes/api/songs'))
app.use('/api/chords', ensureLoggedIn, require('./routes/api/chords'))
// Put API routes here, before the "catch all" route

app.get('/images/:key', (req, res) => {
  console.log('I made it here')
  const key = req.params.key
  console.log('this is key', key)
  const readStream = getFileStream(key)
  console.log('this is readStream', readStream)

  readStream.pipe(res)
})
// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file
  console.log('file', file)
  const result = await uploadFile(file)
  console.log('result', result)
  await unlinkFile(file.path)
  const description = req.body.description
  console.log('description', description)

  const chord = new Chord({
    name: req.body.description,
    chordImage: result.Key,
    learned: false
  })
  chord
    .save()
    .then(r => {
      res.status(200).send({
        _id: r._id,
        name: req.body.description,
        chordImage: result.Key,
        learned: false
      })
    })
    .catch(err => {
      res.send({ message: err })
    })
  // res.send({ imagePath: `/images/${result.Key}` })
})

app.post('/images/song-panel', upload.single('image'), async (req, res) => {
  const file = req.file
  console.log('file', file)
  const result = await uploadFile(file)
  console.log('result', result)
  await unlinkFile(file.path)
  const description = req.body.description
  console.log('description', description)
  console.log('here is req', req)
  const activeSongId = await Song.find({ song: req.body.activeSong })
  console.log('active song[0]._id', activeSongId[0]._id)

  const chord = new Chord({
    name: req.body.description,
    chordImage: result.Key,
    song: activeSongId[0].id,
    learned: false
  })
  chord
    .save()
    .then(result => {
      res.status(200).send({
        _id: r._id,
        name: req.body.description,
        chordImage: result.Key,
        learned: false,
        imagePath: `/images/${result.Key}`
      })
    })
    .catch(err => {
      res.send({ message: err })
    })
  const updatedSongWithChord = await Song.updateMany(
    { song: req.body.activeSong },
    { $set: { chord: [chord._id] } }
  )
  console.log('this is updatedSongWithaChord', updatedSongWithChord)

  // res.send({ imagePath: `/images/${result.Key}` })
})

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001

app.listen(port, function () {
  console.log(`Express app running on port ${port}`)
})

app.listen(8080, () => console.log('listening on port 8080'))
