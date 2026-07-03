const express = require('express');
const expenseModel = require('../model/expense.model');
const { default: mongoose } = require('mongoose');
const User = require('../model/user.model')

async function pieChartAnalytics(req,res,next) {
    try{

        const userId = req.user.id;
       

        const categoryBreakdown = await expenseModel.aggregate([

            {
              $match:{user:new mongoose.Types.ObjectId(userId)}
            },
            {
                $group:{
                    _id:'$category',
                    totalamount:{$sum : {$ifNull:["$amount",0]}},
                    count:{$sum:1}
                }
            },
            {
                $group:{
                    _id:null,
                    categories:{$push:{category:"$_id",totalamount:"$totalamount"}},
                    grandTotal:{$sum:"$totalamount"},
                    count:{$sum:1}
                }
            },
            {
                $unwind:"$categories"
            },
            {
                $project:{
                    category:"$categories.category",
                    totalamount:"$categories.totalamount",
                    percentage:{
                        $cond:[
                            {$eq:["$grandTotal",0]},
                            0,

                           {$round: [
                              {$multiply:[
                                {$divide:["$categories.totalamount","$grandTotal"]},
                            100
                           ]},2
                        ]}
                     ]
                    },
                    grandTotal:"$grandTotal"
                }
            },
            {
                $sort:{totalamount:-1}
            }
        ]);
      

      
        
        
        if (!categoryBreakdown || categoryBreakdown.length === 0) {
            return res.status(200).json({
            success: true,
            message: "No data found for this user.",
            data: []
        });

}

      

        return res.status(200).json({
            success:true,
            message:"Data fetched successfully.",
            data:categoryBreakdown
        })
    }catch(error){
        next(error);
    }
}

async function monthlyBarAnalytics(req,res,next) {
    try{
        const userId = req.user.id;

        const userDoc = await User.findById(userId).select("monthlyIncome");
        const monthlyIncome = userDoc ? userDoc.monthlyIncome : 0;
        

        const targetDate = new Date();
        targetDate.setMonth(targetDate.getMonth() - 5);

        const year = targetDate.getFullYear();
        const month = targetDate.getMonth()+1;


        const graphAnalytics = await expenseModel.aggregate([
            {
                $match:{
                    user:new mongoose.Types.ObjectId(userId),
                    dateAndTime:{$gte : targetDate}
                }
            },
            {
                $group: {
                    _id: {
                       year:{$year:"$dateAndTime"},
                       month:{$month:"$dateAndTime"}
                    },
                    totalamount:{$sum:{$ifNull:["$amount",0]}},
                }

            },
            {
                $sort:{"_id.year":1,"_id.month":1}
            }

            
        ]);

        let average = 0;
        if (graphAnalytics.length > 0) {
           const sum = graphAnalytics.reduce((acc, item) => acc + item.totalamount, 0);
           average = sum / 6; // divide by 6 months, even if some months have no data
        }

        

        return res.status(200).json({
            success: true,
            message: "Data fetched successfully.",
            avg:average,
            monthlyIncome,
            data: graphAnalytics
        });
    }catch(error){
        next(error);
    }
}

async function topExpenses(req,res,next) {
    try{
        const user = req.user.id;

        const allExpense = await expenseModel.find({user}).sort({amount:-1}).limit(3).select("title category amount");

         return res.status(200).json({
            success:true,
            message:"Top 3 expenses.",
            data:allExpense
         });
    }catch(error){
        next(error);
    }
    
}

async function dashboardSummary(req, res, next) {
    try {
        const userId = req.user.id;

        // 1. Get User for Monthly Income
        const userDoc = await User.findById(userId).select("monthlyIncome");
        const monthlyIncome = userDoc ? userDoc.monthlyIncome : 0;

        // 2. Sum of last 30 days expenses
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() - 30);

        const totalSpend30dResult = await expenseModel.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId),
                    dateAndTime: { $gte: targetDate }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: { $ifNull: ["$amount", 0] } }
                }
            }
        ]);
        const totalSpend30d = totalSpend30dResult[0] ? totalSpend30dResult[0].total : 0;

        // 3. Highest Category expending (overall)
        const highestCategoryResult = await expenseModel.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(userId) }
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: { $ifNull: ["$amount", 0] } }
                }
            },
            {
                $sort: { total: -1 }
            },
            {
                $limit: 1
            }
        ]);
        const highestCategory = highestCategoryResult[0] 
            ? { category: highestCategoryResult[0]._id, total: highestCategoryResult[0].total }
            : { category: "None", total: 0 };

        // 4. Total Logs (number of transactions overall)
        const totalLogs = await expenseModel.countDocuments({ user: userId });

        // 5. Budget remaining calculation
        const remainingBudget = Math.max(0, monthlyIncome - totalSpend30d);
        const progress = monthlyIncome > 0 ? Math.round((remainingBudget / monthlyIncome) * 100) : 0;

        return res.status(200).json({
            success: true,
            message: "Dashboard summary calculated successfully.",
            data: {
                totalSpend30d,
                highestCategory,
                totalLogs,
                monthlyIncome,
                remainingBudget,
                progress
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {pieChartAnalytics,monthlyBarAnalytics,topExpenses,dashboardSummary};