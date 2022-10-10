const express = require('express')
const router = express.Router()
const categoryCtrl = require('../../controllers/api/category')

router.post('/add-category', categoryCtrl.addCategory)

module.exports = router
