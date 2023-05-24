const express = require('express');
const router = express.Router();
const orderController = require('../../../controllers/orderController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/', passport.authenticate('jwt', {session: false}), orderController.getAll);
router.get('/:id', passport.authenticate('jwt', {session: false}), orderController.getById);
router.get('/number/:orderNumber', passport.authenticate('jwt', {session: false}), orderController.getByOrderNumber);
router.get('/store/:storeId', passport.authenticate('jwt', {session: false}), orderController.getByStoreId);

//POST routes
router.post('/', passport.authenticate('jwt', {session: false}), orderController.create);

//PUT routes
router.put('/:id', passport.authenticate('jwt', {session: false}), orderController.update);

//DELETE routes

module.exports = router;