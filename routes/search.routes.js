const {Router} = require('express');
const searchControllers = require('../controllers/search.controllers');
const router = Router();

// localhost:5000/api/search
router.get('/', searchControllers.searchController);

module.exports = router;
