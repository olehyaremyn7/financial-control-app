const {Router} = require('express');
const authorizationControllers = require('../controllers/authorization.controllers');
const router = Router();

// localhost:5000/api/authorization/login
router.post('/login', authorizationControllers.loginController);

// localhost:5000/api/authorization/registration
router.post('/registration', authorizationControllers.registrationController);

module.exports = router;
