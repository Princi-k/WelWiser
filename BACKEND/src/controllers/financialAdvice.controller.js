const express = require("express");
const mongoose = require("mongoose");
const Expense = require("../model/expense.model");
const { aiAdvisor } = require("../services/aiAdvisor.service");



async function getFinancialAdvice(req,res) {
   const origin = req.headers.origin || 'http://localhost:5174';
   res.writeHead(200,{
        'Content-Type':'text/event-stream',
        'Cache-Control':'no-cache,no-transform',
        'Connection':'keep-alive',
        'X-Accel-Buffering':'no',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true'
    });

   
    
 
try{
 const userId = req.user.id;
    // Example helper: Exponential Backoff Utility
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function callGeminiWithRetry(userId, retries = 3, backoff = 2000) {
    try {
        return await aiAdvisor(userId); // Call your Gemini execution
    } catch (error) {
        // Agar error 429 hai aur retries bache hain
        if (error.status === 429 && retries > 0) {
            console.warn(`[Quota Exceeded]: 429 hit. Retrying in ${backoff}ms... (${retries} retries left)`);
            await delay(backoff);
            return callGeminiWithRetry(userId, retries - 1, backoff * 2); // Double the wait time
        }
        throw error; // Baaki errors ko normal bubble up hone dein
    }
}
      
       const insight = await callGeminiWithRetry(userId);

     
    if(!insight || insight.length === 0){
        const emptyStatePayload ={ 
            choices:"You dont have any financial data in last 30 days .Please try adding some expense data!"
        };

        res.write(`data:${JSON.stringify(emptyStatePayload)}\n\n`);
        return res.end();
    }
          try{
                 for await(const chunk of insight.stream){
                    const textChunk = chunk.text();
    
                        if(textChunk && textChunk.trim().length > 0){
                            const payloads = {choices : textChunk};
                           
                            res.write(`data:${JSON.stringify(payloads)}\n\n`);
                            
                        }   

                 }
    
            }catch (streamError) {
                console.error("Response streaming loop error:", streamError.message);
                res.write(`data: ${JSON.stringify({ error: "Stream tracking interrupted" })}\n\n`);
            }finally{
                res.end();
            }
    }catch(error){
        console.error("Global Ai Advice route error:", error.message);
        res.write(`data: ${JSON.stringify({ error: "Could not initialize streaming advice channels." })}\n\n`);
        res.end()
    }

   
}

module.exports = {getFinancialAdvice};

