const Song = require('../../models/song')
const Category = require('../../models/category')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function addSong (req, res) {
  try {
    // const collection = await Collection.create(req.body)
    // console.log(
    //   'finding all in category',
    //   await Category.findOne({ category: req.body.activeCat })
    // )
    const song = new Song({
      song: req.body.song,
      category: await Category.findOne({ category: req.body.activeCat })
    })
    await song.save()

    return res.json(song)
  } catch (error) {
    console.log('error')
  }
}

async function getSongsFromCategory (req, res) {
  console.log('req.params.category', req.params.category)
  const categoryId = await Category.findOne({ category: req.params.category })
  const songs = await Song.find({ category: categoryId.id })
    .sort('song')
    .populate('song')
    .exec()
  // re-sort based upon the sortOrder of the categories
  songs.sort((a, b) => a.song.sortOrder - b.song.sortOrder)
  console.log('songs', songs)
  res.json(songs)
}

module.exports = {
  addSong,
  getSongsFromCategory
}
