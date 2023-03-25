const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/userController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.get('/name/:name', passport.authenticate('jwt', {session:false}), userController.getByName);

//POST routes
router.post('/', userController.create);
router.post('/login', userController.login);

//PUT routes

//DELETE routes
router.delete('/:id', passport.authenticate('jwt', {session:false}), userController.deleteUser);

module.exports = router;
