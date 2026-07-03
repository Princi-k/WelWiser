const express = require('express');
const router = express.Router();
const {pieChartAnalytics,monthlyBarAnalytics,topExpenses,dashboardSummary} = require('../controllers/analytics.controller');
const { authUser } = require('../middlewares/auth.middleware');


router.get("/piechartdata",authUser,pieChartAnalytics);

router.get("/monthlybargraph",authUser,monthlyBarAnalytics);

router.get("/topexpenses",authUser,topExpenses);

router.get("/dashboard-summary",authUser,dashboardSummary);



module.exports = router;