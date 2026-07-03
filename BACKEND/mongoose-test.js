const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://princikirme12345:PbMJdpfVF4kmK2Ci@cluster1.cyguf7c.mongodb.net/")
  .then(() => {
    console.log("Mongoose Connected");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });