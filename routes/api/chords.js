const express = require('express')
const router = express.Router()
const chordCtrl = require('../../controllers/api/chords')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

//GET
// router.get('/songs-from-category/:category', songCtrl.getSongsFromCategory)

//POST
router.post('/add-chord', upload.single('image'), chordCtrl.addChord)

module.exports = router
