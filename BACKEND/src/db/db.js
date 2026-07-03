const mongoose = require('mongoose');


const mongooseConnect = async () =>{
    try{
         await mongoose.connect(process.env.MONGO_URL);
         console.log("Database connected.")
    }catch(e){
        console.log(e.message);
    }

};


module.exports = mongooseConnect;