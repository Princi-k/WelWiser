const express = require('express');
const {parseExpenseWithAi} = require('../services/gemini.service');
const Expense = require("../model/expense.model");


async function expenseParse(req,res,next) {

    try{
        const {prompt} = req.body ;
        const user = req.user.id;

        const aiResponseText = await parseExpenseWithAi(prompt);

        let title = "Ai tracked expense" ;
        let category = "others";
        let amount = 0;
    
     try{
        
        const parseData = JSON.parse(aiResponseText);

        if(parseData.title) title = parseData.title;
        if(parseData.category) category = parseData.category.toLowerCase().trim();
        if(parseData.amount && !isNaN(parseData.amount)) amount = Number(parseData.amount);

     }catch(error){
        console.log("Ai json parsing error:",error.message);
     }

       const categories = ['food', 'travel', 'bills', 'entertainment', 'shopping','medical', 'others'];

       if(!categories.includes(category)){
          category = "others";
       }

       if(amount <= 0 && title == "Ai tracked expense"){
         return res.status(400).json({
            success: false,
            message: "AI could not detect any meaningful expense data from your prompt. Please be more specific (e.g., 'Spent 500 on dinner').",
            rawPrompt: prompt
         });
       }

       const isAi = true; //Tell expense i addded using Ai Parser

       const newExpense = new Expense({
        user:user,
        title,
        category,
        amount,
        rawPrompt:prompt,
        isAi
       });

       await newExpense.save();

    return res.status(200).json({
        success:true,
        message:"Ai expense parsed and created successfully.",
        data:newExpense
    })

        
    }catch(error){
        next(error);
    }
}

module.exports = {expenseParse};