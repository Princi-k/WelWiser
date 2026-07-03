const express = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const { getFinancialAdvice } = require("../controllers/financialAdvice.controller");
const { aiRateLimiter } = require("../middlewares/rateLimiter.controller");
const router = express.Router();


router.get('/ai-advisor',authUser,aiRateLimiter,getFinancialAdvice);


module.exports = router;