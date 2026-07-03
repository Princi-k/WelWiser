const express = require("express");
const router = express.Router();
const {exportExpenseToCsv} = require('../controllers/exportToCsv.controller');
const { authUser } = require("../middlewares/auth.middleware");


router.get('/exportExpenseToCsv',authUser,exportExpenseToCsv);


module.exports = router;