const express = require('express')
const router = express.Router()
const categoryCtrl = require('../../controllers/api/category')

//GET /api/categories
router.get('/', categoryCtrl.index)

//POST
router.post('/add-category', categoryCtrl.addCategory)

module.exports = router
