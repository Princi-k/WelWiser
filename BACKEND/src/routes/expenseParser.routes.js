const express = require('express');
const { validateAiExpense } = require('../middlewares/aiExpenseValidator.middleware');
const { expenseParse } = require('../controllers/expenseParser.controller');
const {authUser} = require('../middlewares/auth.middleware')
const router = express.Router();



router.post('/expenseParser',authUser,validateAiExpense,expenseParse);


module.exports = router;