const express = require("express");
const mongoose = require("mongoose");
const expenses = require("../model/expense.model");

// // async function exportExpenseToCsv(req,res) {
// //     try{
// //         let queryObj ={ user:req.user.id };

// //         const {search,category} = req.query;

// //         if(search){
// //             queryObj.title ={ $regex :search ,
// //                            $options:'i' }
// //         }

// //         if(category && category !== 'All'){
// //             queryObj.category = category.trim().toLowerCase();
// //         }

// //         const expense = await expenses.find(queryObj).sort({dateAndTime:-1});

// //         const header = ['Title','Category','Amount','Date'];

// //         const csvRows = expense.map(exp => {
// //             const cleanTitle = exp?.title?exp.title.replace(/"/g,'""'):'';
// //             const title = `"${cleanTitle}"`;
// //             const category = exp?.category || 'N/A';
// //             const amount = exp?.amount || 0;
// //             const date = exp?.dateAndTime ? new Date(exp.dateAndTime).toLocaleDateString():'N/A';

// //             return  `${title},${category},${amount},${date}`;

// //         });

// //         const finalString =['sep=,',header.join(','),...csvRows].join('\n') ;

// //         res.setHeader('Content-Type','text/csv','charset=utf-8');
// //         res.setHeader('Content-Disposition','attachment; filename=expenses.csv');

// //         return res.status(200).json(finalString);




// //     }catch(error){
// //          console.log("Error:", error.message);
// //         return res.status(500).json({
// //             success: false,
// //             message: "Internal server error.",
// //             error: error.message
// //         });
// //     }

// // }

// async function exportExpenseToCsv(req, res,next) {
//     try {
//         const user = req.user.id;
//         const { search, category } = req.query;

//         let queryObj = { user };
//         if (search) queryObj.title = { $regex: search, $options: 'i' };
//         if (category && category !== 'All') queryObj.category = category;

//         const expense = await expenses.find(queryObj).sort({ dateAndTime: -1 });

//         // 1. Semicolon Separated Headers
//         const headers = ['Title', 'Amount', 'Category', 'Date'];

//         // 2. Ultra Clean & Safe Map Engine
//         const csvRows = expense.map(exp => {
//             // Title mein se comma ya semicolon bilkul saaf kar do taaki column break na ho
//             const title = exp?.title ? exp.title.replace(/[,;\n]/g, ' ') : 'Untitled';
//             const amount = exp?.amount || 0;
//             const category = exp?.category ? exp.category.replace(/[,;\n]/g, ' ') : 'N/A';
//             const date = exp?.dateAndTime ? new Date(exp.dateAndTime).toLocaleDateString() : 'N/A';

//             // Bina kisi extra outer quotes ke clean return
//             return `${title};${amount};${category};${date}`;
//         });

//         // 3. Informing Excel about the Semicolon separator explicitely
//         const finalCSVString = ['sep=;', headers.join(';'), ...csvRows].join('\n');

//         // 4. HTTP Settings
//         res.setHeader('Content-Type', 'text/csv; charset=utf-8');
//         res.setHeader('Content-Disposition', 'attachment; filename=expense.csv');

//         return res.status(200).send(finalCSVString);

//     } catch(error){
//         next(error);
//     }
// }


// module.exports  = {exportExpenseToCsv};



// Add a library like 'html-pdf' or simply parse it on frontend.
// To keep things lightweight, we will fix the CSV endpoint first:

// async function exportExpenseToCsv(req, res, next) {
//     try {
//         const user = req.user.id;
//         const { search, category, format } = req.query; // Added format check

//         let queryObj = { user };
//         if (search) queryObj.title = { $regex: search, $options: 'i' };
//         if (category && category !== 'All') queryObj.category = category;

//         const expense = await expenses.find(queryObj).sort({ dateAndTime: -1 });

//         // If the frontend requests JSON directly to render as a list or generate a PDF
//         if (format === 'json') {
//             return res.status(200).json({ success: true, data: expense });
//         }

//         // Standard CSV export without the 'sep=;' line
//         const headers = ['Title', 'Amount', 'Category', 'Date'];
//         const csvRows = expense.map(exp => {
//             const title = exp?.title ? exp.title.replace(/[,;\n]/g, ' ') : 'Untitled';
//             const amount = exp?.amount || 0;
//             const category = exp?.category ? exp.category.replace(/[,;\n]/g, ' ') : 'N/A';
//             const date = exp?.dateAndTime ? new Date(exp.dateAndTime).toLocaleDateString() : 'N/A';

//             // Recommended to use standard comma (,) separation for regular CSV parsers, 
//             // but if you want to keep semicolon (;), use it here without 'sep=;'
//             return `${title};${amount};${category};${date}`;
//         });

//         // REMOVED 'sep=;' so it does not pollute the top row anymore!
//         const finalCSVString = [headers.join(';'), ...csvRows].join('\n');

//         res.setHeader('Content-Type', 'text/csv; charset=utf-8');
//         res.setHeader('Content-Disposition', 'attachment; filename=expense.csv');
//         return res.status(200).send(finalCSVString);

//     } catch(error){
//         next(error);
//     }
// }



async function exportExpenseToCsv(req, res, next) {
    try {
        const user = req.user.id;
        const { search, category, format } = req.query; // 👈 1. Catch the format query parameter

        let queryObj = { user };
        if (search) queryObj.title = { $regex: search, $options: 'i' };
        if (category && category !== 'All') queryObj.category = category;

        const expense = await expenses.find(queryObj).sort({ dateAndTime: -1 });

        // 👈 2. IF FRONTEND WANTS JSON LIST, RETURN RAW DB DATA IMMEDIATELY
        if (format === 'json') {
            return res.status(200).json({ success: true, data: expense });
        }

        // 3. OTHERWISE, PROCEED WITH GENERATING CLEAN CSV FOR DOWNLOAD
        const headers = ['Title', 'Amount', 'Category', 'Date'];

        const csvRows = expense.map(exp => {
            const title = exp?.title ? exp.title.replace(/[,;\n]/g, ' ') : 'Untitled';
            const amount = exp?.amount || 0;
            const category = exp?.category ? exp.category.replace(/[,;\n]/g, ' ') : 'N/A';
            const date = exp?.dateAndTime ? new Date(exp.dateAndTime).toLocaleDateString() : 'N/A';

            return `${title};${amount};${category};${date}`;
        });

        // Clean CSV String (Without the annoying sep=;)
        const finalCSVString = [headers.join(';'), ...csvRows].join('\n');

        // HTTP Settings for raw file download
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename=expense.csv');

        return res.status(200).send(finalCSVString);

    } catch(error) {
        next(error);
    }
}

module.exports = {exportExpenseToCsv}