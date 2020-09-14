const {Router} = require('express');
const passport = require('passport');
const aboutControllers = require('../controllers/about.controllers');
const router = Router();

// localhost:5000/api/about
router.post('/message', passport.authenticate('jwt', {session: false}), aboutControllers.messageController);

module.exports = router;
