const mongoose = require('mongoose');
const user = require('./user.model');
const { type } = require('node:os');


const expenseSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        trim:true,
        enum:['food', 'travel', 'bills', 'entertainment', 'shopping','medical', 'others'],
        lowercase:true,
        required:true,
        default:'others'
    },
    amount:{
        type:Number,
        required:true,
        trim:true,
        min:0
    },
    // UPDATED FIELD: Removed required: true to support manual entries
    rawPrompt: {
        type: String,
        trim: true,
        default: null // Manual entry ke waqt yeh field safely null rahegi
    },
    dateAndTime:{
        type:Date,
        required:true,
        default:Date.now()
    },
    isAi:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const expense  = mongoose.model('Expense',expenseSchema);

module.exports=expense;