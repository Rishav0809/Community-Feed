const express = require("express");
const passport = require("passport");
require("../config/passport")(passport);
var axios = require("axios");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const router = express.Router();
var API = require("../api");

var BSEAPI = API.BSE;
var NSEAPI = API.NSE;

// Get the stock market status (open/closed) - JSON
// Example: http://localhost:3000/get_market_status
router.get("/get_market_status", (req, res, next) => {
  NSEAPI.getMarketStatus().then(function (response) {
    res.json(response.data);
  });
});

// Get the NSE indexes information (last updated, name, previous close, open, low, high, last, percent change, year high and low, index order) - JSON
// Example: http://localhost:3000/nse/get_indices
router.get("/nse/get_indices", (req, res, next) => {
  NSEAPI.getIndices().then(function (response) {
    res.json(response.data);
  });
});

// Get the quotes of all indexes in NSE - HTML
// Example: http://localhost:3000/nse/get_quotes
router.get("/nse/get_quotes", (req, res, next) => {
  NSEAPI.getQuotes().then(function (response) {
    res.json(response.data);
  });
});

// Get the quotation data of the symbol (companyName) from NSE - JSON
// Example: http://localhost:3000/nse/get_quote_info?companyName=TCS
router.get("/nse/get_quote_info", (req, res, next) => {
  NSEAPI.getQuoteInfo(req.query.companyName).then(function (response) {
    res.json(response.data);
  });
});

// Get the quotation data of the symbols (companyNames) from NSE - JSON
// Example: http://localhost:3000/nse/get_multiple_quote_info?companyNames=TCS,WIPRO
router.get("/nse/get_multiple_quote_info", (req, res, next) => {
  const companyNames = req.query.companyNames.split(",");
  NSEAPI.getMultipleQuoteInfo(companyNames).then((r) => res.json(r));
});

// Get the top 10 gainers of NSE - JSON
// Example: http://localhost:3000/nse/get_gainers
router.get("/nse/get_gainers", (req, res, next) => {
  NSEAPI.getGainers().then(function (response) {
    res.json(response.data);
  });
});

// Get the top 10 losers of NSE - JSON
// Example: http://localhost:3000/nse/get_losers
router.get("/nse/get_losers", (req, res, next) => {
  NSEAPI.getLosers().then(function (response) {
    res.json(response.data);
  });
});

// Get advances/declines of individual index, and the value if its changed or not - JSON
// Example: http://localhost:3000/nse/get_incline_decline
router.get("/nse/get_incline_decline", (req, res, next) => {
  NSEAPI.getInclineDecline().then(function (response) {
    res.json(response.data);
  });
});

// Get the information of all the companies in a single NSE index (slug) JSON
// Example: http://localhost:3000/nse/get_index_stocks?symbol=nifty
router.get("/nse/get_index_stocks", (req, res, next) => {
  NSEAPI.getIndexStocks(req.query.symbol).then(function (response) {
    res.json(response.data);
  });
});

// Get the list of companies in provided NSE index with matching keyword data - JSON
// Example: http://localhost:3000/nse/search_stocks?keyword=AXIS
router.get("/nse/search_stocks", (req, res, next) => {
  NSEAPI.searchStocks(req.query.keyword).then(function (response) {
    res.json(response.data);
  });
});

// Get the intra day data of company in NSE - XML
// Example: http://localhost:3000/nse/get_intra_day_data?companyName=TCS&time=1
// Example: http://localhost:3000/nse/get_intra_day_data?companyName=TCS&time=month
router.get("/nse/get_intra_day_data", (req, res, next) => {
  NSEAPI.getIntraDayData(req.query.companyName, req.query.time).then(function (
    response
  ) {
    res.json(response.data);
  });
});

// Get 52 weeks all high stocks in NSE - JSON
// Example: http://localhost:3000/nse/get_52_week_high
router.get("/nse/get_52_week_high", (req, res, next) => {
  NSEAPI.get52WeekHigh().then(function (response) {
    res.json(response.data);
  });
});

// Get 52 weeks all low stocks in NSE - JSON
// Example: http://localhost:3000/nse/get_52_week_low
router.get("/nse/get_52_week_low", (req, res, next) => {
  NSEAPI.get52WeekLow().then(function (response) {
    res.json(response.data);
  });
});

// Get the NSE stocks whose values are highest - JSON
// Example: http://localhost:3000/nse/get_top_value_stocks
router.get("/nse/get_top_value_stocks", (req, res, next) => {
  NSEAPI.getTopValueStocks().then(function (response) {
    res.json(response.data);
  });
});

// Get the NSE stocks whose volumes sold are highest - JSON
// Example: http://localhost:3000/nse/get_top_volume_stocks
router.get("/nse/get_top_volume_stocks", (req, res, next) => {
  NSEAPI.getTopVolumeStocks().then(function (response) {
    res.json(response.data);
  });
});

// Get the futures data for a company stock (symbol) and time - JSON
// Example: http://localhost:3000/nse/get_stock_futures_data?companyName=TCS&time=15
// Example: http://localhost:3000/nse/get_stock_futures_data?companyName=VEDL&time=month
router.get("/nse/get_stock_futures_data", (req, res, next) => {
  NSEAPI.getStockFuturesData(req.query.companyName, req.query.time).then(
    function (response) {
      res.json(response.data);
    }
  );
});

// Get chart data of a companyName(symbol) depending on time in NSE - CSV Format (delimiter - |)
// Example: http://localhost:3000/nse/get_chart_data_new?companyName=VEDL&time=5
// Example: http://localhost:3000/nse/get_chart_data_new?companyName=VEDL&time=year
router.get("/nse/get_chart_data_new", (req, res, next) => {
  NSEAPI.getChartDataNew(req.query.companyName, req.query.time).then(function (
    response
  ) {
    res.json(response.data);
  });
});

router.get("/nse/get_indices", (req, res, next) => {
  NSEAPI.getIndices().then(function (response) {
    res.json(response.data);
  });
});

module.exports = router;
