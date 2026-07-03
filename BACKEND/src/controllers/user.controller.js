const express = require('express');
const userModel = require('../model/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function registerUser(req,res,next) {
 try{
    const {username , email , password , monthlyIncome ,mobileNo } = req.body ;

    
    const isUserAlreadyExist = await userModel.findOne({
        $or:[{username},{email},{mobileNo}]
    });


     if(isUserAlreadyExist){
       return res.status(409).json({message:"User already exist."});
    }

    const hash = await bcrypt.hash(password,10);
    
   
    const user = await userModel.create({
        username,
        email,
        password:hash,
        monthlyIncome,
        mobileNo
    });

     const token = await jwt.sign({
        id:user._id
    },process.env.SECRET_KEY);


    res.cookie("token",token);

    console.log(token)

    

    console.log(username,email,password,mobileNo);
    
    res.status(200).json({message:'user is registered.',
        userId:user._id,
        username:user.username,
        email:user.email,
        monthlyIncome:user.monthlyIncome,
        mobileNo:user.mobileNo
        
    })

  }catch(error){
    next(error);
  }
}

async function getUsers(req,res,next){
  try{
    const allUser = await userModel.find();

    res.status(200).json({message:"All registeres users.",
        allUser
    });

    
  }catch(error){
    next(error);
  }

    
}

async function loginUser(req,res,next) {

    try{
      const {detail,password} = req.body;

        const user = await userModel.findOne({
        $or:[{username:detail},
          {email:detail},
          {mobileNo:detail}]
        });

     if(!user){
        return res.status(401).json({message:"Invalid credentials."})
        }

        const validPassword = await bcrypt.compare(password,user.password);

        if(!validPassword){
        return res.status(401).json({message:"Invalid Password"});
        }

        const token = await jwt.sign({
         id:user._id
        },process.env.SECRET_KEY);

        res.cookie("token",token,{
          httpOnly: true,                    // Prevents frontend JS from reading the cookie
          secure: process.env.NODE_ENV === "production", // Ensures HTTPS in production
          sameSite: "lax",                // Protects against CSRF attacks, allows cross-origin requests on localhost
           maxAge: 3600000
        });

    

        res.status(200).json({message:"User logged in.",
        userId:user._id,
        username:user.username,
        email:user.email,
        monthlyIncome:user.monthlyIncome,
        mobileNo:user.mobileNo,
       
    });

    
  }catch(error){
    next(error);
  }
}


async function logoutUser(req,res,next) {
    try{
        res.clearCookie("token");
        res.status(200).json({message:"User logged out."})
    
    }catch(error){
    next(error);
   }

}

async function updateUser(req,res,next) {
  try {
    const userId = req.user.id;
    const { username, email, mobileNo, monthlyIncome } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { username, email, mobileNo, monthlyIncome },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User updated successfully.",
      username: updatedUser.username,
      email: updatedUser.email,
      mobileNo: updatedUser.mobileNo,
      monthlyIncome: updatedUser.monthlyIncome
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {registerUser,getUsers,loginUser,logoutUser,updateUser};