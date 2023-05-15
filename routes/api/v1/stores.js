const express = require('express');
const router = express.Router();
const storeController = require('../../../controllers/storeController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/', passport.authenticate('jwt', {session:false}), storeController.getAll);
router.get('/:id', passport.authenticate('jwt', {session:false}), storeController.getById);
router.get('/name/:name', passport.authenticate('jwt', {session:false}), storeController.getByName);

//POST routes
router.post('/', passport.authenticate('jwt', {session:false}), storeController.create);

//PUT routes
router.put('/:id', passport.authenticate('jwt', {session:false}), storeController.update);

//DELETE routes
router.delete('/:id', passport.authenticate('jwt', {session:false}), storeController.deleteStore);

module.exports = router;