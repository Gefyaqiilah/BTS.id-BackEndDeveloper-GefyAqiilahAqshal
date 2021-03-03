const express = require('express');
const router = express.Router()

const { signUp, signIn, getAllUser } = require('../controllers/users');
const authentication = require('../helpers/authentication');
router
.post('/signup', signUp)
.post('/signin', signIn)
.get('/', authentication, getAllUser)

module.exports = router