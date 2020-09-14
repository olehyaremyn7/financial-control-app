const {Router} = require('express');
const passport = require('passport');
const transactionControllers = require('../controllers/transaction.controllers');
const router = Router();

// localhost:5000/api/transaction/:accountId
router.get('/:accountId', passport.authenticate('jwt', {session: false}), transactionControllers.getByAccountIdController);

// localhost:5000/api/transaction/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), transactionControllers.removeController);

// localhost:5000/api/transaction/expense
router.post('/expense', passport.authenticate('jwt', {session: false}), transactionControllers.createExpenseController);

// localhost:5000/api/transaction/profit
router.post('/profit', passport.authenticate('jwt', {session: false}), transactionControllers.createProfitController);

// localhost:5000/api/transaction/:id
router.patch('/:id', passport.authenticate('jwt', {session: false}), transactionControllers.updateController);

module.exports = router;
