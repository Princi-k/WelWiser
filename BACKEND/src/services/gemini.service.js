const dotenv = require("dotenv");
dotenv.config();
const {GoogleGenerativeAI} = require('@google/generative-ai');

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemInstruction = "You are a strict backend data parser for an expense tracking application. Your sole job is to extract financial details from user prompts and return them in a structured format. You must analyze the text and output a single, minified JSON object containing exactly three keys: 'title' (string),'category' (string) and 'amount' (number)  . For the 'category' field, you must classify the expense into EXACTLY ONE of the following allowed lowercase values: 'food', 'travel', 'bills', 'entertainment', 'shopping', 'medical', or 'others'. If an expense does not fit neatly into the first six categories, map it to 'others'. Do not include markdown blocks, triple backticks (```), or any conversational filler text in your response.";

const parseExpenseWithAi = async (promptText) =>{
    
    const model = ai.getGenerativeModel({
        model:"gemini-2.5-flash",
        systemInstruction:systemInstruction 
    });

    const responseSchema = {
        type:"OBJECT",
        properties :{
            title:{type:"STRING"},
            category:{type:"STRING"},
            amount:{type:"NUMBER"}
        },
        required : ["title","category","amount"]
    };

    const response = await model.generateContent({
        contents:[{ parts: [{ text: promptText }] }],
        generationConfig:{
            responseMimeType:"application/json",
            responseSchema:responseSchema,
            temperature:0
        }
    });


    return response.response.text();
}

module.exports = {parseExpenseWithAi};