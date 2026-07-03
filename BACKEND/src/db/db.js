const mongoose = require('mongoose');


const mongooseConnect = async () =>{
    try{
         await mongoose.connect(process.env.MONGO_URL);
         console.log("Database connected.")
    }catch(e){
        console.log(e.message);
    }

};


// module.exports = mongooseConnect;


// const mongoose = require("mongoose");

// const mongooseConnect = async () => {
//   try {
//     console.log("Connecting...");

//     await mongoose.connect(
//       "mongodb+srv://princikirme12345:PbMJdpfVF4kmK2Ci@cluster1.cyguf7c.mongodb.net/"
//     );

//     console.log("Database connected.");
//   } catch (err) {
//     console.error("Full Error:");
//     console.error(err);
//   }
// };

module.exports = mongooseConnect;