const express = require("express");
const rateLimiter  = require("express-rate-limit");


const aiRateLimiter = rateLimiter({
    windowMs : 60*15*1000,
    limit : 15,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        success:false,
        message: "Too many financial requests generated from this device. Please try again after 15 minutes.",
        
    }
});

module.exports = {aiRateLimiter}