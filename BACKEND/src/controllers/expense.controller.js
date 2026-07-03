const express = require("express");
const expenseModel = require('../model/expense.model');
const userModel = require('../model/user.model');
const { getDefaultHighWaterMark } = require("node:stream");
const expense = require("../model/expense.model");



// async function userExpense(req,res,next) {
//     const {title,category,amount,dateAndTime} = req.body;

//     const user = req.user.id;

//     try{
//          if(amount <= 0){
//              return res.status(400).json({message:"Invalid amount."});
//           }

//          const finalCategory = category ? category.trim() : "Others" ;
    
//          const newExpense = await expenseModel.create({
//              user,
//              title,
//              category:finalCategory,
//              amount,
//              dateAndTime

//           });

//         res.status(201).json({message:"Expense added sucessfully.",
//             data:newExpense

//         });
    
//     }catch(error){
//         next(error);
//     }
    
    
// }

// async function getUserExpense(req,res,next) {

//     try{
//          let query = {user:req.user.id};

//     if(req.query.category && req.query.category.trim()  != ""){
//          query.category = req.query.category.trim();

//     }

//     if(req.query.range){
//         const rangeStr = req.query.range;

//         if(rangeStr.includes("day")){
//             let daysCount =  parseInt(rangeStr);

//             if(!isNaN(daysCount)){
//                 let targetDate = new Date();
//                 targetDate.setDate(targetDate.getDate()-daysCount);

//                 query.dateAndTime = {$gte:targetDate}

//             }
            
//         }else if(rangeStr.includes("month")){
            
//             if(req.query.month || req.query.year){
               
//                 let y = parseInt(req.query.year);
//                 let m = parseInt(req.query.month) - 1;

      

//                 let firstDate = new Date(y,m,1,0,0,0);
//                 let lastDate = new Date(y,m+1,0,23,59,59);

//                  query.dateAndTime = { $gte : firstDate , $lte: lastDate}
//             }else{
//                 let monthCount =  parseInt(rangeStr);
//                 console.log(monthCount)

//                 if(isNaN(monthCount)){ monthCount = 1;}

//                     let targetDate = new Date();
//                     targetDate.setMonth(targetDate.getMonth()-monthCount);
//                     console.log(targetDate)

//                     query.dateAndTime = {$gte:targetDate}

              
//             }


//         }
//     }

   

//        let expenses =  await expenseModel.find(query).sort({dateAndTime:-1});

//        const totalCount = expenses.reduce((sum,ele) => sum + ele.amount,0) ;
        

//        return res.status(200).json({
//             success: true,
//             count: expenses.length,
//             summary:totalCount,
//             data: expenses
//         });

//     }catch(error){
//         next(error);
//     }
    
   
// }

// async function updateExpense(req,res,next) {
//    try{

//         const {title,category,amount} = req.body ;
//         const expenseId = req.params.id;

//         console.log(req.params.id)
//         console.log(req.user.id);

//         const expenseExist = await expenseModel.findOne({
//              _id:expenseId,
//              user:req.user.id     
//          });

//          console.log(expenseExist)

//          if(!expenseExist){
//            return res.status(404).json({
//                 message:"Expense not found."
//             });
//          }

//         const updatedExpense = await expenseModel.findByIdAndUpdate(
//               expenseId,
//              {title,category,amount},
//              {returnDocument:'after',runValidators:true}
//         );
    
//         return res.status(200).json({
//              success:true,
//              message:"Expense updated succesfully.",
//              data:updatedExpense
//          });
//    }catch(error){
//         next(error);
//     }
  
    
// }

// async function deleteExpense(req,res,next) {

//     try{
//         const expenseId = req.params.id;

//         const findExpense = await expenseModel.findOne({
//             _id:expenseId,
//             user:req.user.id
//         });

//         if(!findExpense){
//             return res.status(404).json({
//                 message:"Expense not found."
//             })
//         }

//         const expense = await expenseModel.findByIdAndDelete(expenseId);

//         return res.status(200).json({
//             success:true,
//             message:"Expense deleted succesfully",
//             data:expense
//         })
//     }catch(error){
//         next(error);
//     }
    
// }



// module.exports = {userExpense,getUserExpense,updateExpense,deleteExpense}

// const express = require("express");
// const expenseModel = require('../model/expense.model');
// const userModel = require('../model/user.model');

async function userExpense(req, res, next) {
    const { title, category, amount, dateAndTime } = req.body;
    const user = req.user.id;

    try {
         if (amount <= 0) {
             return res.status(400).json({ message: "Invalid amount." });
         }

         const finalCategory = category ? category.trim() : "Others";
    
         const newExpense = await expenseModel.create({
             user,
             title,
             category: finalCategory,
             amount,
             dateAndTime
         });

         res.status(201).json({
             success: true,
             message: "Expense added successfully.",
             data: newExpense
         });
    } catch (error) {
        next(error);
    }
}

async function getUserExpense(req, res, next) {
    try {
        let query = { user: req.user.id };

        if (req.query.category && req.query.category.trim() != "") {
             query.category = req.query.category.trim();
        }

        if (req.query.range) {
            const rangeStr = req.query.range;

            if (rangeStr.includes("day")) {
                let daysCount = parseInt(rangeStr);
                if (!isNaN(daysCount)) {
                    let targetDate = new Date();
                    targetDate.setDate(targetDate.getDate() - daysCount);
                    query.dateAndTime = { $gte: targetDate };
                }
            } else if (rangeStr.includes("month")) {
                if (req.query.month || req.query.year) {
                    let y = parseInt(req.query.year);
                    let m = parseInt(req.query.month) - 1;

                    let firstDate = new Date(y, m, 1, 0, 0, 0);
                    let lastDate = new Date(y, m + 1, 0, 23, 59, 59);
                    query.dateAndTime = { $gte: firstDate, $lte: lastDate };
                } else {
                    let monthCount = parseInt(rangeStr);
                    if (isNaN(monthCount)) { monthCount = 1; }

                    let targetDate = new Date();
                    targetDate.setMonth(targetDate.getMonth() - monthCount);
                    query.dateAndTime = { $gte: targetDate };
                }
            }
        }

        let expenses = await expenseModel.find(query).sort({ dateAndTime: -1 });
        const totalCount = expenses.reduce((sum, ele) => sum + ele.amount, 0);

        return res.status(200).json({
            success: true,
            count: expenses.length,
            summary: totalCount,
            data: expenses
        });
    } catch (error) {
        next(error);
    }
}

async function updateExpense(req, res, next) {
   try {
        const { title, category, amount, dateAndTime } = req.body;
        const expenseId = req.params.id;

        const expenseExist = await expenseModel.findOne({
             _id: expenseId,
             user: req.user.id     
        });

        if (!expenseExist) {
           return res.status(404).json({ message: "Expense not found." });
        }

        const updatedExpense = await expenseModel.findByIdAndUpdate(
              expenseId,
              { title, category, amount, dateAndTime },
              { returnDocument: 'after', runValidators: true }
        );
    
        return res.status(200).json({
             success: true,
             message: "Expense updated successfully.",
             data: updatedExpense
         });
   } catch (error) {
        next(error);
   }
}

async function deleteExpense(req, res, next) {
    try {
        const expenseId = req.params.id;
        const findExpense = await expenseModel.findOne({
            _id: expenseId,
            user: req.user.id
        });

        if (!findExpense) {
            return res.status(404).json({ message: "Expense not found." });
        }

        const expense = await expenseModel.findByIdAndDelete(expenseId);

        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
            data: expense
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { userExpense, getUserExpense, updateExpense, deleteExpense };