require('dotenv').config()
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const express = require('express');
const app = express();
const mongooseConnect = require('./db/db');
const userRoute = require('./routes/user.route');
const expenseRoute = require('./routes/expense.route');
const analyticsRoute = require('./routes/anaylitics.route');
const exportToCsvRoute = require('./routes/exportToCsv.route');
const expenseParser = require('./routes/expenseParser.routes');
const aiAdvisorRoute = require('./routes/aiAdvisor.route')
const {globalErrorHandler} = require('../src/middlewares/errorHandlers');
const cookieParser = require('cookie-parser');
const cors = require('cors');


mongooseConnect();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods:["POST","GET","DELETE","PUT","PATCH"],
    credentials:true
}))




app.use('/user',userRoute);
app.use('/user',expenseRoute);
app.use('/user',analyticsRoute);
app.use('/user',exportToCsvRoute);
app.use('/user',expenseParser);
app.use('/user',aiAdvisorRoute);





app.use(globalErrorHandler);

module.exports = app ;