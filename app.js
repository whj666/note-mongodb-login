var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { DBHOST, DBPORT, DBNAME } = require("./config");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(
  session({
    name: "sid", // 设置cookie的名称
    secret: "风林沐雨", // 密钥 参与加密的字符串(又称 签名) 加盐
    saveUninitialized: false, // 是否为每次请求都设置一个cookie用来存储session的id
    // 是否在每次请求时重新保存session，session有生命周期，如果用户长时间不操作，
    // session失效后，用户再访问需要重新登录
    resave: true,
    store: MongoStore.create({
      mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`,
    }),
    cookie: {
      // 设置cookie的特性
      httpOnly: true, // 前端将无法访问这个cookie
      maxAge: 1000 * 60 * 2, // 设置cookie的生命周期，也是设置session的生命周期 60秒
    },
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
