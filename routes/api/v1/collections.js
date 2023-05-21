const express = require('express');
const router = express.Router();
const collectionController = require('../../../controllers/collectionController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/', passport.authenticate('jwt', {session:false}), collectionController.getAll);
router.get('/:id', passport.authenticate('jwt', {session:false}), collectionController.getById);
router.get('/name/:name', passport.authenticate('jwt', {session:false}), collectionController.getByName);
router.get('/store/:store', passport.authenticate('jwt', {session:false}), collectionController.getByStore);

//POST routes
router.post('/', passport.authenticate('jwt', {session:false}), collectionController.createCollection);

//PUT routes
router.put('/:id', passport.authenticate('jwt', {session:false}), collectionController.updateCollection);

//DELETE routes
router.delete('/:id', passport.authenticate('jwt', {session:false}), collectionController.deleteCollection);

module.exports = router;