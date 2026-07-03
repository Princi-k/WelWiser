const express = require('express');
const {body,validationResult}  = require('express-validator');


const validateResult = (req,res,next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return  res.status(400).json({
            success:false,
            error:errors.array().map(err => ({field : err.path ,
                 message: err.message}))
        })
    }

    next();
}


const validateAiExpense = [
    body('prompt').trim().notEmpty().withMessage('Prompt is required.')
    .isString().withMessage('It should be valid string.')
    .isLength({min:5,max:500}).withMessage('Valid expense length(min:5,max:500) is required.'),
    validateResult
]

module.exports = {validateAiExpense};