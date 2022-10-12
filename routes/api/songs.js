const express = require('express')
const router = express.Router()
const songCtrl = require('../../controllers/api/song')

//GET
router.get('/songs-from-category/:category', songCtrl.getSongsFromCategory)

//POST
router.post('/add-song', songCtrl.addSong)

module.exports = router
