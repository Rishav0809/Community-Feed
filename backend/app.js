const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const dotenv = require("dotenv").config();

//routes
const homeRoutes = require("./routes/home");
const userRouter = require("./routes/user_routes");
const communityRoutes = require("./routes/community_routes");
const commentRoutes = require("./routes/comment_router");
const { dirname } = require("path");

//app use specifications
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../ejs_integration/views"));
app.use(express.static(path.resolve(__dirname, "../ejs_integration/public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//database connection
mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected db successfully");
  }
});

//routes

//user route
app.use("/", homeRoutes);
app.use("/community", communityRoutes);
app.use("/api/user", userRouter);
app.use("/api/community", communityRoutes);
app.use("/api/post/:id", commentRoutes);

//running the server

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
