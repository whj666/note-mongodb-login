var express = require("express");
var router = express.Router();
const { UserModel } = require("../models");
const md5 = require("md5");

// 注册 页面
router.get("/reg", function (req, res, next) {
  res.render("reg");
});

// 登录 页面
router.get("/login", function (req, res, next) {
  res.render("login");
});

// 注册
router.post("/reg", (req, res) => {
  UserModel.create({ ...req.body, password: md5(req.body.password) })
    .then((data) => {
      if (data) {
        res.send(`<div>注册成功<br /><a href='/login'>登录</a></div>`);
      }
    })
    .catch((err) => {
      if (err) {
        res.send(`<div>注册失败~<br /><a href='/reg'>返回</a></div>`);
      }
    });
});

// 登录
router.post("/login", (req, res) => {
  UserModel.findOne({ username: req.body.username }).then((data) => {
    if (data && data.password === md5(req.body.password)) {
      // 设置 session
      req.session.username = req.body.username;
      req.session._id = data._id;

      res.redirect("/");
    } else {
      res.send(`<div>登录失败<br /><a href='/login'>确定</a></div>`);
    }
  });
});

// 退出
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
