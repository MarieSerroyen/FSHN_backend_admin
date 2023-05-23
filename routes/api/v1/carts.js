const express = require('express');
const router = express.Router();
const cartController = require('../../../controllers/cartController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/', passport.authenticate('jwt', {session: false}), cartController.getAll);
router.get('/:id', passport.authenticate('jwt', {session: false}), cartController.getById);
//router.get('/orderNumber/:orderNumber', passport.authenticate('jwt', {session: false}), cartController.getByOrderNumber);
router.get('/store/:storeId', passport.authenticate('jwt', {session: false}), cartController.getByStoreId);
router.get('/client/:clientNumber', passport.authenticate('jwt', {session: false}), cartController.getByClientNumber);

//POST routes
router.post('/', passport.authenticate('jwt', {session: false}), cartController.create);

//PUT routes
router.put('/:id', passport.authenticate('jwt', {session: false}), cartController.update);

//DELETE routes
router.delete('/:id', passport.authenticate('jwt', {session: false}), cartController.deleteCart);

module.exports = router;