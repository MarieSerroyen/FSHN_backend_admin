const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/userController');
const passport = require('../../../passport/passport');
//const authenticate = require('../../../middleware/authenticate');

//GET routes
//router.get('/auth', authenticate, userController.authenticate);
router.get('/', passport.authenticate('jwt', {session:false}), userController.getAll);
router.get('/:id', passport.authenticate('jwt', {session:false}), userController.getById);
router.get('/name/:name', passport.authenticate('jwt', {session:false}), userController.getByName);


//POST routes
router.post('/', passport.authenticate('jwt', {session:false}), userController.create);
router.post('/login', userController.login);
router.post('/:id', passport.authenticate('jwt', {session:false}), userController.changePassword);

//PUT routes

//DELETE routes
router.delete('/:id', passport.authenticate('jwt', {session:false}), userController.deleteUser);

module.exports = router;
