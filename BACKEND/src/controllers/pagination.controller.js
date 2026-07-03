// const express = require("express");
// const mongoose = require("mongoose");
// const expenseModel = require("../model/expense.model");


// async function allExpenseByPage(req,res,next) {
//     try{
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 10;
//         let queryObj ={ user:req.user.id };

//         const {search,category} = req.query;

//         if(search){
//             queryObj.title ={ $regex :search ,
//                            $options:'i' }
//         }

//         if(category && category !== 'All'){
//             queryObj.category = category.trim().toLowerCase();
//         }

//          const expense = await expenseModel.find(queryObj).sort({dateAndTime:-1}).skip((page-1)*limit).limit(limit);

//          const totalCount = await expenseModel.countDocuments(queryObj);

//          const totalPage = Math.ceil(totalCount/limit);

//          let prevPage = page > 1 ; 
//          let nextPage = page < totalPage;
        

//         return res.status(200).json({
//             "success": true,
//             "message": "Expenses fetched successfully",
//              "pagination": {
//                  "totalItems": totalCount,
//                  "totalPages": totalPage,
//                  "currentPage": page,
//                  "limit": limit,
//                  "hasNextPage": nextPage,
//                  "hasPrevPage": prevPage
//               },
//              "data":expense
//         });
//     }catch(error){
//         next(error);
//     }
    


// }


// module.exports = {allExpenseByPage};


const express = require("express");
const mongoose = require("mongoose");
const expenseModel = require("../model/expense.model");

async function allExpenseByPage(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        let queryObj = { user: req.user.id };

        const { search, category } = req.query;

        if (search) {
            queryObj.title = { 
                $regex: search, 
                $options: 'i' 
            };
        }

        if (category && category !== 'All') {
            queryObj.category = category.trim().toLowerCase();
        }

        const expense = await expenseModel.find(queryObj)
            .sort({ dateAndTime: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalCount = await expenseModel.countDocuments(queryObj);
        const totalPage = Math.ceil(totalCount / limit);

        let prevPage = page > 1; 
        let nextPage = page < totalPage;

        return res.status(200).json({
            "success": true,
            "message": "Expenses fetched successfully",
            "pagination": {
                "totalItems": totalCount,
                "totalPages": totalPage,
                "currentPage": page,
                "limit": limit,
                "hasNextPage": nextPage,
                "hasPrevPage": prevPage
            },
            "data": expense
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { allExpenseByPage };