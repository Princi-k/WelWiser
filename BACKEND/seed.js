const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Models Import (Paths apne folder ke mutabik check kar lein)
const User = require('./src/model/user.model'); 
const Expense = require('./src/model/expense.model'); 

const MONGO_URI = 'mongodb+srv://princikirme12345:PbMJdpfVF4kmK2Ci@cluster1.cyguf7c.mongodb.net/'; 

// Random array helpers for expenses
const categories = ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment'];
const titles = {
    'Food': ['Swiggy Delivery', 'Zomato Dinner', 'Grocery Shopping', 'Chai & Samosa', 'McDonalds Burger'],
    'Travel': ['Uber Ride', 'Ola Cab', 'Metro Recharge', 'Petrol Fuel', 'Auto Fare'],
    'Bills': ['Electricity Bill', 'Wifi Internet', 'Mobile Recharge', 'Rent Payment', 'Netflix Subscription'],
    'Shopping': ['New T-Shirt', 'Shoes', 'Amazon Electronics', 'Jeans', 'Watch'],
    'Entertainment': ['Movie Ticket', 'Gaming Zone', 'Concert Pass', 'Bowling Alley', 'Cricket Match']
};

// Utility function to get a random date within the last 6 months
function getRandomDateInLast6Months() {
    const now = new Date();
    // 0 se 180 din ke beech ka koi bhi random din piche ka nikalein
    const randomDaysAgo = Math.floor(Math.random() * 180); 
    const randomDate = new Date(now.getTime() - randomDaysAgo * 24 * 60 * 60 * 1000);
    return randomDate;
}

async function startMasterSeeding() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("⚡ MongoDB Connected for Master Seeding...");

        // Clear existing data to avoid duplication during testing
        await User.deleteMany({ email: { $regex: /@test\.com$/ } });
        await Expense.deleteMany({}); // Purane saare test expenses delete
        console.log("🧹 Cleaned existing test data...");

        // Common Password
        const hashedPassword = await bcrypt.hash("password123", 10);

        // 10 Dummy Users with an added 'income' field
       
        const dummyUsers = [
  {
    username: "amit_sharma",
    email: "amit.sharma@gmail.com",
    password: hashedPassword, // Using the variable here
    mobileNo: "9876543210",         
    monthlyIncome: 45000            
  },
  {
    username: "suresh_kumar",
    email: "suresh.kumar@gmail.com",
    password: hashedPassword, // Same safe hash for testing convenience
    mobileNo: "8765432109",
    monthlyIncome: 62000
  },
  {
    username: "rahul_verma",
    email: "rahul.verma@gmail.com",
    password: hashedPassword,
    mobileNo: "7654321098",
    monthlyIncome: 35000
  },
  {
    username: "priya_patel",
    email: "priya.patel@gmail.com",
    password: hashedPassword,
    mobileNo: "6543210987",
    monthlyIncome: 75000
  }
];
        

        console.log("🚀 Seeding 10 Users with Income fields...");
        const createdUsers = await User.insertMany(dummyUsers);
        console.log(`✅ ${createdUsers.length} Users successfully created.`);

        // --- EXPENSE SEEDING ENGINE ---
        console.log("🏭 Manufacturing 50 random expenses spread across 6 months...");
        const expenseBatch = [];

        // Hame 50 items chahiye
        for (let i = 0; i < 50; i++) {
            // Randomly select one of our newly created users
            const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
            
            // Randomly select a category
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            
            // Map category to a relevant logical title
            const titleOptions = titles[randomCategory];
            const randomTitle = titleOptions[Math.floor(Math.random() * titleOptions.length)];
            
            // Generate dynamic amount between ₹100 and ₹4000
            const randomAmount = Math.floor(Math.random() * 3900) + 100;

            // Build individual expense object
            expenseBatch.push({
                user: randomUser._id, // Relational connection mapping
                title: randomTitle,
                category: randomCategory,
                amount: randomAmount,
                dateAndTime: getRandomDateInLast6Months() // Spreaded Date Engine
            });
        }

        // Bulk insert all expenses in one go
        const createdExpenses = await Expense.insertMany(expenseBatch);
        console.log(`✅ ${createdExpenses.length} Expenses successfully seeded and linked to users!`);

    } catch (error) {
        console.error("❌ Seeding failed:", error.message);
    } finally {
        await mongoose.connection.close();
        console.log("🔌 Database connection cleanly closed.");
        process.exit(0);
    }
}

startMasterSeeding();