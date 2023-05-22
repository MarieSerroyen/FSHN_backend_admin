const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/userController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/auth',passport.authenticate('jwt', {session:false}), userController.authenticate);
router.get('/', passport.authenticate('jwt', {session:false}), userController.getAll);
router.get('/:id', passport.authenticate('jwt', {session:false}), userController.getById);
router.get('/name/:name', passport.authenticate('jwt', {session:false}), userController.getByName);

//POST routes
router.post('/', userController.create);
router.post('/login', userController.login);
router.post('/:id', passport.authenticate('jwt', {session:false}), userController.changePassword);

//PUT routes

//DELETE routes
router.delete('/:id', passport.authenticate('jwt', {session:false}), userController.deleteUser);

module.exports = router;
