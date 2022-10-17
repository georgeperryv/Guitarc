const Song = require('../../models/song')
const Category = require('../../models/category')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function addSong (req, res) {
  try {
    // if (Song.find({ song: req.body.song })) {
    //   console.log('not new try again')
    //   return res.json('Please enter a unique song')
    // } else {
    console.log('inside the else for addSong')
    const song = new Song({
      song: req.body.song,
      category: await Category.findOne({ category: req.body.activeCat }),
      user: req.user._id
    })
    await song.save()

    return res.json(song)
  } catch (error) {
    console.log('error')
  }
}

async function getSongsFromCategory (req, res) {
  try {
    console.log('req.params.category', req.params.category)
    const categoryId = await Category.findOne({
      category: req.params.category,
      user: req.user._id
    })
    const songs = await Song.find({
      category: categoryId.id,
      user: req.user._id
    })
      .sort('song')
      .populate('song')
      .exec()
    // re-sort based upon the sortOrder of the categories
    songs.sort((a, b) => a.song.sortOrder - b.song.sortOrder)
    console.log('songs', songs)
    res.json(songs)
  } catch {
    res.json([])
  }
}

module.exports = {
  addSong,
  getSongsFromCategory
}
