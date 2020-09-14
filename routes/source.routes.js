const {Router} = require('express');
const passport = require('passport');
const sourceControllers = require('../controllers/source.controllers');
const router = Router();

// localhost:5000/api/source
router.get('/', passport.authenticate('jwt', {session: false}), sourceControllers.getAllController);

// localhost:5000/api/source/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), sourceControllers.removeController);

// localhost:5000/api/source
router.post('/', passport.authenticate('jwt', {session: false}), sourceControllers.createController);

module.exports = router;
