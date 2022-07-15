const decoder = require("jwt-decode");
var express = require("express");
const bodyParser = require("body-parser");

var admin = require("firebase-admin");

var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
console.log(__dirname);

app.get("/", (req, res) => {
  res.render("index", { title: "News Feed" });
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

app.post("/login", (req, res) => {
  console.log(req.credential);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Listening at http://%s:%s", host, port);
});
