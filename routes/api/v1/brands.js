const express = require('express');
const router = express.Router();
const brandController = require('../../../controllers/brandController');

//GET routes

//POST routes
router.post('/', brandController.create);

module.exports = router;