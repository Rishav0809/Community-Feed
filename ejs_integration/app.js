var express = require("express");
var axios = require("axios");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var passport = require("passport");

//require Routes
const homeRoutes = require("./routes/index");
const authRoutes = require("./routes/user");
const userRoutes = require("./routes/userRoutes");
const apiRoutes = require("./routes/api");
const communityRoutes = require("./routes/community_routes");
const commentRoutes = require("./routes/comment_router");

const MongoStore = require("connect-mongo");

//mongo connect
require("dotenv").config();
require("./config/database").connect();

var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "cookie_secret",
    name: "kaas",
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/community", communityRoutes);
app.use("/profile", userRoutes);
app.use("/post/", commentRoutes);

var fs = require("fs");
var path = require("path");

const router = express.Router();

// News Mongo DB
var multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
var newsModel = require("./models/newsblog");
var upload = multer({ storage: storage });

//Keeping one route here, so that image upload path does not need to be changed

app.post("/blogEditor", upload.single("image"), (req, res, next) => {
  console.log(req.body.content);
  var obj = {
    header: req.body.header,
    content: req.body.content,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };

  newsModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
      res.redirect("/");
    }
  });
});

module.exports = app;
