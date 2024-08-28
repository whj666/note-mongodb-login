const mongoose = require("mongoose");

const db = (openCallback) => {
  mongoose.connection.on("open", openCallback);

  mongoose.connection.on("error", () => {
    console.log("连接失败");
  });

  mongoose.connection.on("close", () => {
    console.log("连接关闭");
  });
};

module.exports = db;
