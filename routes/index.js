var express = require("express");
var router = express.Router();
const url = require("url");
const path = require("path");
const moment = require("moment");
const checkLoginMiddleware = require("../middleware/checkLogin");
// const low = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");

// const adapter = new FileSync(path.resolve(__dirname, "../data/db.json"));
// const db = low(adapter);

const { NoteModel } = require("../models");

// 列表
router.get("/", checkLoginMiddleware, function (req, res, next) {
  // res.render("list", { title: "列表", data: db.get("note").value() });
  NoteModel.find()
    .select({ time: 1, things: 1, inout: 1, count: 1 })
    .exec()
    .then((data) => {
      res.render("list", {
        title: "列表",
        data: JSON.parse(JSON.stringify(data)).map((one) => ({
          ...one,
          time: moment(one.time).format("YYYY-MM-DD"),
        })),
      });
    });
});

// 新增 编辑
router.get("/create", checkLoginMiddleware, function (req, res, next) {
  const {
    query: { _id },
  } = url.parse(req.url, true);

  // res.render("create", {
  //   title: _id ? "编辑" : "创建",
  //   data: _id ? db.get("note").find({ _id }).value() : {},
  // });

  if (_id) {
    NoteModel.findById(_id).then((data) => {
      const _data = JSON.parse(JSON.stringify(data));
      res.render("create", {
        title: "编辑",
        data: { ..._data, time: moment(_data.time).format("YYYY-MM-DD") },
      });
    });
  } else {
    res.render("create", {
      title: "创建",
      data: {},
    });
  }
});

// 新增 编辑 提交
router.post("/api/create", checkLoginMiddleware, (req, res) => {
  const {
    query: { _id },
  } = url.parse(req.url, true);

  // if (_id) {
  //   db.get("note").find({ _id }).assign(req.body).write();
  // } else {
  //   db.get("note")
  //     .push({ _id: String(Math.random()), ...req.body })
  //     .write();
  // }

  // res.render("success", { title: "操作成功" });

  if (_id) {
    NoteModel.updateOne(
      { _id },
      { ...req.body, time: new Date(req.body.time) }
    ).then((data) => {
      if (data) {
        res.render("success", { title: "操作成功" });
      }
    });
  } else {
    NoteModel.create({ ...req.body, time: new Date(req.body.time) }).then(
      (data) => {
        if (data) {
          res.render("success", { title: "操作成功" });
        }
      }
    );
  }
});

// 删除
router.get("/delete/:_id", checkLoginMiddleware, function (req, res, next) {
  // db.get("note").remove({ _id: req.params._id }).write();
  // res.render("success", { title: "删除成功" });

  NoteModel.deleteOne({ _id: req.params._id }).then((data) => {
    if (data) {
      res.render("success", { title: "删除成功" });
    }
  });
});

module.exports = router;
