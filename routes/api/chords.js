const express = require('express')
const router = express.Router()
const chordCtrl = require('../../controllers/api/chords')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

//GET
router.get('/song-panel/:activeSong', chordCtrl.getAllSongChords)

router.get('/chord-library', chordCtrl.getAllIndependentChords)

//POST
// router.post('/add-chord', upload.single('image'), chordCtrl.addChord)

module.exports = router
