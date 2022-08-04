var express = require("express");
var axios = require("axios");
var API = require("./api");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var fs = require("fs");

var BSEAPI = API.BSE;
var NSEAPI = API.NSE;

require("dotenv").config();
require("./config/database").connect();

var app = express();

// Get the stock market status (open/closed) - JSON
// Example: http://localhost:3000/get_market_status
app.get("/get_market_status", (req, res, next) => {
  NSEAPI.getMarketStatus().then(function (response) {
    res.json(response.data);
  });
});

// Get the NSE indexes information (last updated, name, previous close, open, low, high, last, percent change, year high and low, index order) - JSON
// Example: http://localhost:3000/nse/get_indices
app.get("/nse/get_indices", (req, res, next) => {
  NSEAPI.getIndices().then(function (response) {
    res.json(response.data);
  });
});

// Get the quotes of all indexes in NSE - HTML
// Example: http://localhost:3000/nse/get_quotes
app.get("/nse/get_quotes", (req, res, next) => {
  NSEAPI.getQuotes().then(function (response) {
    res.json(response.data);
  });
});

// Get the quotation data of the symbol (companyName) from NSE - JSON
// Example: http://localhost:3000/nse/get_quote_info?companyName=TCS
app.get("/nse/get_quote_info", (req, res, next) => {
  NSEAPI.getQuoteInfo(req.query.companyName).then(function (response) {
    res.json(response.data);
  });
});

// Get the quotation data of the symbols (companyNames) from NSE - JSON
// Example: http://localhost:3000/nse/get_multiple_quote_info?companyNames=TCS,WIPRO
app.get("/nse/get_multiple_quote_info", (req, res, next) => {
  const companyNames = req.query.companyNames.split(",");
  NSEAPI.getMultipleQuoteInfo(companyNames).then((r) => res.json(r));
});

// Get the top 10 gainers of NSE - JSON
// Example: http://localhost:3000/nse/get_gainers
app.get("/nse/get_gainers", (req, res, next) => {
  NSEAPI.getGainers().then(function (response) {
    res.json(response.data);
  });
});

// Get the top 10 losers of NSE - JSON
// Example: http://localhost:3000/nse/get_losers
app.get("/nse/get_losers", (req, res, next) => {
  NSEAPI.getLosers().then(function (response) {
    res.json(response.data);
  });
});

// Get advances/declines of individual index, and the value if its changed or not - JSON
// Example: http://localhost:3000/nse/get_incline_decline
app.get("/nse/get_incline_decline", (req, res, next) => {
  NSEAPI.getInclineDecline().then(function (response) {
    res.json(response.data);
  });
});

// Get the information of all the companies in a single NSE index (slug) JSON
// Example: http://localhost:3000/nse/get_index_stocks?symbol=nifty
app.get("/nse/get_index_stocks", (req, res, next) => {
  NSEAPI.getIndexStocks(req.query.symbol).then(function (response) {
    res.json(response.data);
  });
});

// Get the list of companies in provided NSE index with matching keyword data - JSON
// Example: http://localhost:3000/nse/search_stocks?keyword=AXIS
app.get("/nse/search_stocks", (req, res, next) => {
  NSEAPI.searchStocks(req.query.keyword).then(function (response) {
    res.json(response.data);
  });
});

// Get the intra day data of company in NSE - XML
// Example: http://localhost:3000/nse/get_intra_day_data?companyName=TCS&time=1
// Example: http://localhost:3000/nse/get_intra_day_data?companyName=TCS&time=month
app.get("/nse/get_intra_day_data", (req, res, next) => {
  NSEAPI.getIntraDayData(req.query.companyName, req.query.time).then(function (
    response
  ) {
    res.json(response.data);
  });
});

// Get 52 weeks all high stocks in NSE - JSON
// Example: http://localhost:3000/nse/get_52_week_high
app.get("/nse/get_52_week_high", (req, res, next) => {
  NSEAPI.get52WeekHigh().then(function (response) {
    res.json(response.data);
  });
});

// Get 52 weeks all low stocks in NSE - JSON
// Example: http://localhost:3000/nse/get_52_week_low
app.get("/nse/get_52_week_low", (req, res, next) => {
  NSEAPI.get52WeekLow().then(function (response) {
    res.json(response.data);
  });
});

// Get the NSE stocks whose values are highest - JSON
// Example: http://localhost:3000/nse/get_top_value_stocks
app.get("/nse/get_top_value_stocks", (req, res, next) => {
  NSEAPI.getTopValueStocks().then(function (response) {
    res.json(response.data);
  });
});

// Get the NSE stocks whose volumes sold are highest - JSON
// Example: http://localhost:3000/nse/get_top_volume_stocks
app.get("/nse/get_top_volume_stocks", (req, res, next) => {
  NSEAPI.getTopVolumeStocks().then(function (response) {
    res.json(response.data);
  });
});

// Get the futures data for a company stock (symbol) and time - JSON
// Example: http://localhost:3000/nse/get_stock_futures_data?companyName=TCS&time=15
// Example: http://localhost:3000/nse/get_stock_futures_data?companyName=VEDL&time=month
app.get("/nse/get_stock_futures_data", (req, res, next) => {
  NSEAPI.getStockFuturesData(req.query.companyName, req.query.time).then(
    function (response) {
      res.json(response.data);
    }
  );
});

// Get chart data of a companyName(symbol) depending on time in NSE - CSV Format (delimiter - |)
// Example: http://localhost:3000/nse/get_chart_data_new?companyName=VEDL&time=5
// Example: http://localhost:3000/nse/get_chart_data_new?companyName=VEDL&time=year
app.get("/nse/get_chart_data_new", (req, res, next) => {
  NSEAPI.getChartDataNew(req.query.companyName, req.query.time).then(function (
    response
  ) {
    res.json(response.data);
  });
});

app.get("/nse/get_indices", (req, res, next) => {
  NSEAPI.getIndices().then(function (response) {
    res.json(response.data);
  });
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/", async (req, res) => {
  let ans;
  try {
    const status = await axios.get("http://localhost:3000/get_market_status");
    ans = await axios.get("http://localhost:3000/nse/get_indices");
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
      console.log(items);
    }
  });

  res.render("index", { title: "News Feed", nifty: ans });
});

app.post("/blogEditor", upload.single("image"), (req, res, next) => {
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

app.get("/community", (req, res) => {
  res.render("community", { title: "Community Feed" });
});

app.get("/sip", (req, res) => {
  res.render("sip", { title: "SIP Calculator" });
});

app.get("/fd", (req, res) => {
  res.render("fd", { title: "FD Calculator" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

app.get("/blogEditor", (req, res) => {
  res.render("blogEditor", { title: "Blog Editor" });
});

app.get("/stocks", (req, res) => {
  res.render("stocks", { title: "Popular Stocks" });
});

app.get("/specificStocks", (req, res) => {
  res.render("specificStocks", { title: "Specific Stocks" });
});

app.get("/loan", (req, res) => {
  res.render("loanEMI", { title: "Loan EMI Calculator" });
});

app.get("/dream", (req, res) => {
  res.render("dream", { title: "Dream Come True Calculator" });
});

app.get("/volatility", (req, res) => {
  res.render("volatility", { title: "Risk to Volatile Calculator" });
});

app.get("/expenses", (req, res) => {
  res.render("expenses", { title: "Expenses Calculator" });
});

app.get("/marquee", (req, res) => {
  res.render("marquee", { title: "Marquee Stocks Index" });
});
app.get("/budget", (req, res) => {
  res.render("budget", { title: "Budgeting/Saving Tool" });
});
app.post("/login", (req, res) => {
  console.log(req.credential);
});

module.exports = app;
