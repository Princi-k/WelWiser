const { CaseLower } = require('lucide-react');
const mongoose = require('mongoose');
const { time, timeStamp } = require('node:console');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required.'],
        trim:true,
        unique:true

    },
    email:{
        type:String,
        required:[true,'email is required.'],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        trim:true,
        minlength:6
    },
    mobileNo:{
        type:String,
        trim:true,
        default:null

    },
    monthlyIncome:{
        type:Number,
        required:[true,'monthy income is required'],
    }
},{timeStamp:true});

const user = mongoose.model("User",userSchema);

module.exports = user;