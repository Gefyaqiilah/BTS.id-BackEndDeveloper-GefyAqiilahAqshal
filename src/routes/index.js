const express = require('express');
const router = express.Router()

const usersRoute = require('./users');
const shoppingRoute = require('./shopping');

router.use('/users', usersRoute)
router.use('/shopping', shoppingRoute)

module.exports = router