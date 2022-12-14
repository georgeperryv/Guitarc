const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// Insert ensureLoggedIn on all routes that need protecting
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken)

// POST : http://localhost:3001/api/users
router.post('/', usersCtrl.create)

// POST : http://localhost:3001/api/users/login
router.post('/login', usersCtrl.login)

// router.get('/api/products/all', ensureLoggedIn, productCtrl.getAll)

module.exports = router
