require('dotenv').config()
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ["https://welwiser-1.onrender.com","https://welwiser-1.onrender.com/", "http://localhost:5174","http://localhost:3000"];
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




app.options("*", cors()); // Enable pre-flight for all routes
const mongooseConnect = require('./db/db');
const userRoute = require('./routes/user.route');
const expenseRoute = require('./routes/expense.route');
const analyticsRoute = require('./routes/anaylitics.route');
const exportToCsvRoute = require('./routes/exportToCsv.route');
const expenseParser = require('./routes/expenseParser.routes');
const aiAdvisorRoute = require('./routes/aiAdvisor.route')
const {globalErrorHandler} = require('../src/middlewares/errorHandlers');



mongooseConnect();





app.use('/user',userRoute);
app.use('/user',expenseRoute);
app.use('/user',analyticsRoute);
app.use('/user',exportToCsvRoute);
app.use('/user',expenseParser);
app.use('/user',aiAdvisorRoute);





app.use(globalErrorHandler);

module.exports = app ;