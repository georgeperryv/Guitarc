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
  try {
    var finalChordArray = []
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
  } catch {
    res.json('Please attach an image of the chord')
  }
}

async function getAllIndependentChords (req, res) {
  try {
    var totalChordArray = []
    console.log('inside getAllIndependentChords')
    const allChords = await Chord.find({ user: req.user._id })
    console.log('allChords12', allChords)
    // const arrayOfChords = allChords[0].name
    // console.log('arrayOfChords12', arrayOfChords)

    // for (const element of arrayOfChords) {
    //   const chordObject = await Chord.findById(element)
    //   totalChordArray.push(chordObject)
    // }

    // console.log('finalIndependentChordArray123', finalChordArray)

    res.json(allChords)
  } catch {
    res.json('Didnt work')
  }
}

///might just need to return that one chord?
async function changeLearnedStatus (req, res) {
  console.log('inside changedLearnedStatus4')
  try {
    var totalChordArray = []
    console.log('chordId asdfadsf', req.params.chordId)
    const chord = await Chord.findById(req.params.chordId)
    if (chord.learned) {
      console.log('inside chord.learned true')
      const currentChord = await Chord.findOneAndUpdate(
        { _id: req.params.chordId },
        update,
        { learned: false }
      )
      await currentChord.save()
      res.json('complete')
    } else {
      console.log('inside chord.learned false')
      const currentChord2 = await Chord.findByIdAndUpdate(req.params.chordId, {
        $set: { learned: true }
      })
      console.log('currentChord2', currentChord2)
      await currentChord2.save()
      console.log('this is currentChord2', currentChord2)
      res.json('complete')
    }

    // console.log('this is currentChord65', currentChord)
    //   const chordToChange = await Chord.findOneAndUpdate(
    //     req.params.chordId,
    //     update,
    //     { learned: false }
    //   )
    //   const allChords = await Chord.find({ user: req.user._id })
    //   res.json(allChords)
    // } else {
    //   const chordToChange2 = await Chord.findOneAndUpdate(
    //     req.params.chordId,
    //     update,
    //     { learned: true }
    //   )
    //   const allChords = await Chord.find({ user: req.user._id })
    //   res.json(allChords)
    // }
  } catch {
    res.json('Didnt work')
  }
}

module.exports = {
  getAllSongChords,
  getAllIndependentChords,
  changeLearnedStatus
}
