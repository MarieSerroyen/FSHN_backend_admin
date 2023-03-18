const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/userController');

//GET routes
router.get('/', userController.getAll);
router.get('/:id', userController.getById);

//POST routes
router.post('/', userController.create);
router.post('/login', userController.login);

module.exports = router;
