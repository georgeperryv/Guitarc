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

module.exports = {
  addSong
}
