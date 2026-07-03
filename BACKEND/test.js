// const { MongoClient } = require("mongodb");

// const uri = "mongodb+srv://princikirme12345:PbMJdpfVF4kmK2Ci@cluster1.cyguf7c.mongodb.net/";

// async function main() {
//   try {
//     const client = new MongoClient(uri);
//     await client.connect();
//     console.log("Connected!");
//     await client.close();
//   } catch (err) {
//     console.error(err);
//   }
// }

// main();

const targetDate = new Date();
targetDate.setMonth(targetDate.getMonth() - 6);

console.log(targetDate);

console.log(targetDate.getFullYear());
console.log(targetDate.getMonth()+1)