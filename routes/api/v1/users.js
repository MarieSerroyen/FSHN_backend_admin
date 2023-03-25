const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/userController');

//GET routes
router.get('/', userController.getAll);
router.get('/:id', userController.getById);

//POST routes
router.post('/', userController.create);
router.post('/login', userController.login);

//PUT routes

//DELETE routes
router.delete('/:id', userController.deleteUser);

module.exports = router;
