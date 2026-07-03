const express = require("express");
const {body , validationResult} = require("express-validator");

const validateResult = (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({ field: err.path, message: err.msg }))
        })
    }

    next();
}

const validateRegister = [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage("Please enter a valid email."),
    body('password').isLength({min:6}).withMessage('Password must be six character long'),
    body('monthlyIncome').isNumeric().withMessage('Monthly income must be a number'),
    body('mobileNo').optional().isMobilePhone().withMessage('Please enter a valid mobile number.'),
    validateResult
];

const validateLogin = [
    body('password').notEmpty().withMessage('Password cannot be empty.'),
    validateResult
];

const validateExpense = [
    body('title').trim().notEmpty().withMessage('Expense title is required.'),
    body('category').trim().toLowerCase().isIn(['food', 'travel', 'bills', 'entertainment', 'shopping','medical', 'others']).withMessage('Invalid category.'),
    body('amount').isNumeric().withMessage('Amount must be a positive number.').toFloat()

];


module.exports = {validateExpense,validateLogin,validateRegister};