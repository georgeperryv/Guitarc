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

//PUT
router.put('/change-learned-status/:chordId', chordCtrl.changeLearnedStatus)

router.put('/attach-chord/:activeChordId/:activeSong', chordCtrl.attachChord)

module.exports = router
