const mongoose = require("mongoose");

// 创建文档的结构对象，设置文档的属性和属性值的类型
const NoteSchema = new mongoose.Schema({
  things: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: Date,
    required: true,
  },
  inout: {
    type: String,
    enum: ["1", "-1"],
  },
  count: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// 创建模型对象，对文档操作的封装对象
const NoteModel = mongoose.model("notes", NoteSchema);
const UserModel = mongoose.model("users", UserSchema);

module.exports = { NoteModel, UserModel };
