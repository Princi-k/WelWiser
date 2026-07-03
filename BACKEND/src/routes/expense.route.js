const express = require('express');
const router = express.Router();
const {authUser} = require('../middlewares/auth.middleware');
const {validateExpense} = require('../middlewares/validator.middleware')
const {userExpense,getUserExpense,updateExpense,deleteExpense} = require('../controllers/expense.controller')
const {allExpenseByPage} = require('../controllers/pagination.controller');

router.post('/userexpense',authUser,validateExpense,userExpense);

router.get('/expenses-all',authUser,getUserExpense);

router.get('/expenses-paginated',authUser,allExpenseByPage);

router.patch('/updateExpense/:id',authUser,updateExpense);

router.delete('/deleteExpense/:id',authUser,deleteExpense);

module.exports = router;

