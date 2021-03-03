const express = require('express');
const router = express.Router()

const { newShopping, getAllShopping, getById, deleteShopping, updateShopping } = require('../controllers/shopping');
const authentication = require('../helpers/authentication');

router
.post('/', authentication, newShopping)
.get('/', authentication, getAllShopping)
.get('/:id', authentication, getById)
.delete('/:id', authentication, deleteShopping)
.patch('/:id', authentication, updateShopping)

module.exports = router