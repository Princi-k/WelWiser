const express = require('express');

function globalErrorHandler(err,req,res,next){
    console.log('Error Logged:',err.stack || err.message);

    if(err.code === 11000){
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({
            success:false,
            message:`This ${field} is already registered.`
        });
    }

    if(err.name === 'ValidationError'){
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
            success:false,
            message:messages.join(',')
        })
    }

    if(err.name === 'JsonWebTokenError'){
        return res.status(401).json({
            success: false,
             message: 'Invalid token. Please login again.'
        })
    }

    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong on the server."
    })
}

module.exports = {globalErrorHandler};