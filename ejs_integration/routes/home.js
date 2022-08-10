const axios = require("axios");
const express = require("express");
const News = require("../models/newsblog");
const router = express.Router();

//Get Routes
router.get("/index", async (req, res) => {
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

  News.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { title: "News Feed", nifty: ans, items: items });
    }
  });
});

//Post Routes

//Put Routes

//Delete Routes

module.exports = router;
