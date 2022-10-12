const express = require('express')
const router = express.Router()
const songCtrl = require('../../controllers/api/song')

//POST
router.post('/add-song', songCtrl.addSong)

module.exports = router
