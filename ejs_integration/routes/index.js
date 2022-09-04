const express = require("express");
const passport = require("passport");
require("../config/passport")(passport);
var axios = require("axios");
const { ensureAuthenticated } = require("../middleware/auth");
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
var newsModel = require("../models/newsblog");
var upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  console.log(req.user);
  let ans;
  try {
    const status = await axios.get(
      "http://localhost:3000/api/get_market_status"
    );
    ans = await axios.get("http://localhost:3000/api/nse/get_indices");
    ans = ans.data.data;

    if (status.data.status === "closed") {
      ans = ans[0].previousClose;
    } else {
      ans = ans[0].open;
    }
  } catch (err) {
    console.log(`error ${err}`);
    ans = "Data currently unavailable";
  }

  newsModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      // res.render("index", {
      //   title: "News Feed",
      //   nifty: ans,
      //   items: items,
      //   user: req.user,
      // });
      res.redirect("https://projectnewsfeed.blogspot.com/");
    }
  });
});

router.get("/sip", (req, res) => {
  res.render("sip", { title: "SIP Calculator", user: req.user });
});

router.get("/fd", (req, res) => {
  res.render("fd", { title: "FD Calculator", user: req.user });
});

router.get("/blogEditor", (req, res) => {
  res.render("blogEditor", { title: "Blog Editor", user: req.user });
});

router.get("/stocks", (req, res) => {
  res.render("stocks", { title: "Popular Stocks", user: req.user });
});

router.get("/specificStocks", (req, res) => {
  res.render("specificStocks", { title: "Specific Stocks", user: req.user });
});

router.get("/loan", (req, res) => {
  res.render("loanEMI", { title: "Loan EMI Calculator", user: req.user });
});

router.get("/dream", (req, res) => {
  res.render("dream", { title: "Dream Come True Calculator", user: req.user });
});

router.get("/volatility", (req, res) => {
  res.render("volatility", {
    title: "Risk to Volatile Calculator",
    user: req.user,
  });
});

router.get("/expenses", (req, res) => {
  res.render("expenses", { title: "Expenses Calculator", user: req.user });
});

router.get("/marquee", (req, res) => {
  res.render("marquee", { title: "Marquee Stocks Index", user: req.user });
});
router.get("/budget", (req, res) => {
  res.render("budget", { title: "Budgeting/Saving Tool", user: req.user });
});

module.exports = router;
