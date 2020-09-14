const {Router} = require('express');
const passport = require('passport');
const profileControllers = require('../controllers/profile.controllers');
const upload = require('../middleware/upload.middleware');
const router = Router();

// localhost:5000/api/profile
router.get('/', passport.authenticate('jwt', {session: false}), profileControllers.getController);

// localhost:5000/api/profile
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), profileControllers.createNewDataController);

// localhost:5000/api/profile
router.patch('/', passport.authenticate('jwt', {session: false}), profileControllers.updateController);

module.exports = router;
