const Expense = require('../model/expense.model');
const mongoose = require("mongoose");
const {GoogleGenerativeAI} = require('@google/generative-ai');
const { text } = require('node:stream/consumers');

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const systemInstruction = "You are an expert AI Financial Advisor and Coach. You will receive a structured JSON summary representing the user's spending data for the past 30 days. " +
//             "Analyze their behavior, categories, habits, and flags. Provide exactly 3 short, precise, and actionable bullet points of personalized advice. " +
//             "Point 1 must target their highest spending category or volume. Point 2 must alert them about their highest single transaction. Point 3 must give a definitive saving tip or structural optimization metric based on their context. " +
//             "Do not output markdown code blocks (like ```json or ```text). Do not include pleasantries or long introductions. Output plain text bullet points.";

const aiAdvisor = async (userId, userQuery = "") =>{
 
   try{    


        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate()-30);
    
        const getData = await Expense.aggregate([
            {
                $match:{
                    user:new mongoose.Types.ObjectId(userId),
                    dateAndTime:{$gte:targetDate}
                }
            },
     
            {
                $facet:{
                    totalSumOfCategory:[
                      {
                         $group:{
                          _id: "$category",
                          totalAmount:{ $sum : "$amount"},
                          transactionCount:{$sum:1}
                       }
                      }
                       
                    ],
                     sourceMetrices:[
                    {
                         $group:{
                            _id:"$isAi",
                            totalSpent:{$sum:"$amount"},
                            count:{$sum:1}
                         }
                     }
    
                     ],
                     highestTransaction:[
                                 { $sort: {amount:-1}},
                                 {$limit:1},
                                 { $project:{
                                    title: 1,
                                    amount: 1,
                                    category: 1,
                                    dateAndTime: 1
                            }}
                    ]
                        
                    
                }
            }
        ]);
    
        
    const data = getData[0];
    const hasTransactions = data.totalSumOfCategory.length>0;


    if(!hasTransactions) return null;


    if(!data ||  !data.totalSumOfCategory || data.totalSumOfCategory.length === 0) return null;

    const overAllTotal = data.totalSumOfCategory.reduce((sum,item) => sum+item.totalAmount,0);
   
    const compactContext = {
        monthlyGrandTotal:overAllTotal,
        categoryBreakDown : data.totalSumOfCategory,
        trackingMethodology:data.sourceMetrices,
        biggestExpense:data.highestTransaction[0] || null
    }

   

    const dynamicSystemInstruction = userQuery
      ? `You are a professional AI Financial Advisor chatbot. 
         Analyze the user's spending data for the past 30 days.
         Answer the user's questions clearly, concisely, and professionally based on their spending data.
         Keep the tone encouraging, helpful, and professional.
         CRITICAL CURRENCY AND FORMATTING RULES:
         1. DO NOT use the dollar sign ($) under any circumstances.
         2. Display all financial amounts with the '₹' or 'INR'.
         3. DO NOT use asterisks (*) or markdown bullet symbols in the response. Use clean paragraphs or numbered points without bold markdown.`
      : `You are a professional AI Financial Advisor chatbot. 
         Analyze the user's spending data provided in the prompt context.
         You must only focus on the provided financial dataset covering the past 30 days. 
         Provide insights strictly inside 3 clear, actionable points:
         1. Highlight the highest spending category with specific values.
         2. Alert on unusual patterns or the highest transaction.
         3. Give a practical saving tip or identify volume trends.
         Do not provide long conversational filler text, greetings, markdown blocks, or extra intros.
         CRITICAL CURRENCY AND FORMATTING RULES:
         1. DO NOT use the dollar sign ($) under any circumstances.
         2. Display all financial amounts with the '₹' or 'INR'.
         3. DO NOT use asterisks (*) or markdown bullet symbols in the response. Output must contain 3 clear, actionable plain text points matching the aggregated metrics exactly (do not prefix them with asterisks or dashes).`;

    const model = await ai.getGenerativeModel({
        model:"gemini-2.5-flash",
        generationConfig:{
            temperature: userQuery ? 0.7 : 0.2
        },
        systemInstruction: dynamicSystemInstruction
    });
  
    const promptText = userQuery
      ? `Here is my financial snapshot for the last 30 days: ${JSON.stringify(compactContext)}
         
         My Question: "${userQuery}"`
      : `Here is my financial snapshot: ${JSON.stringify(compactContext)}`;

    const response = await model.generateContentStream({
        contents:[{parts:[{text: promptText}]}]
    });

    
            


   
    // console.log(response.response.text());

    
    // let rawText = "";
    // if (response && typeof response.response.text() === 'function') {
    //     rawText = response.response.text();
    // }

//     let rawText = response.response.text();
    
    
   

//     const advicePoints = rawText.split('\n')
//     .map(point => point.replace(/^-\s*|\*\s*/,'').trim())
//     .filter(point => point.length>0);

//     if (advicePoints.length === 0) {
//     advicePoints.push(
//         "Analyze your spending patterns weekly to maintain budget discipline.",
//         "Set aside a fixed percentage of income immediately after receiving it.",
//         "Review your recurring subscriptions to eliminate unused automated expenses."
//     );
// }


    return response;
        //  summary:compactContext,
        //  advice:advicePoints.slice(0,3)
        
    
  }catch(error){
    console.log("Ai advisor route error:",error.message);
    throw(error);
  }

}

module.exports = {aiAdvisor}









