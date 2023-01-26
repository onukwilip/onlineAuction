const mongoose = require("mongoose");

const connect = async () => {
  const con = await mongoose.connect(process.env.MONGODB_URI).catch((e) => {
    console.log(e);
    process.exit(1);
  });
  if (con) {
    console.log(`Connected successfully`);
  }
  // console.log("URI", process.env.MONGODB_URI);
};

module.exports = connect;
