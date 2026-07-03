const express = require("express");
const jwt = require('jsonwebtoken')

async function authUser(req,res,next) {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if(!token){
        return res.status(401).json({message:"Login required."});
    }


    try{
         const decoded = await jwt.verify(token,process.env.SECRET_KEY);

         req.user = decoded ;

         next();
    }catch(e){
        console.log(e);
        res.status(401).json({message:"Unauthoraized Access."});
    }
   
}

module.exports = {authUser};