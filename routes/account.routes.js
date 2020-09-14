const {Router} = require('express');
const passport = require('passport');
const accountControllers = require('../controllers/account.controllers');
const router = Router();

// localhost:5000/api/account
router.get('/', passport.authenticate('jwt', {session: false}), accountControllers.getAllController);

// localhost:5000/api/account/:id
router.get('/:id', passport.authenticate('jwt', {session: false}), accountControllers.getByIdController);

// localhost:5000/api/account/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), accountControllers.removeController);

// localhost:5000/api/account
router.post('/', passport.authenticate('jwt', {session: false}), accountControllers.createController);

// localhost:5000/api/account/:id
router.patch('/:id', passport.authenticate('jwt', {session: false}), accountControllers.updateController);

module.exports = router;
