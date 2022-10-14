const Song = require('../../models/song')
const Chord = require('../../models/chord')
const { uploadFile } = require('../../s3')

// async function addChord (req, res) {
//   const file = req.file
//   console.log(file)
//   const result = await uploadFile(file)
//   console.log('result', result)
//   const description = req.body.description
//   res.send('nice')
// }

async function getAllSongChords (req, res) {
  const finalChordArray = []
  console.log('inside getAllSongChords')
  const correctSong = await Song.find({
    song: req.params.activeSong,
    user: req.user._id
  })
  const arrayOfChords = correctSong[0].chord

  for (const element of arrayOfChords) {
    const chordObject = await Chord.findById(element)
    finalChordArray.push(chordObject)
  }
  //   arrayOfChords.forEach(async element => {
  //     const x = await Chord.findById(element)
  //     console.log('x', x)
  //     finalChordArray.push(x)

  //     // finalChordArray.save(function (err) {})
  //   })
  console.log('finalChordArray123', finalChordArray)

  // })
  //   const songs = await Song.find({ category: categoryId.id })
  //     .sort('song')
  //     .populate('song')
  //     .exec()
  //   // re-sort based upon the sortOrder of the categories
  //   songs.sort((a, b) => a.song.sortOrder - b.song.sortOrder)
  //   console.log('songs', songs)

  res.json(finalChordArray)
}

module.exports = {
  getAllSongChords
}
