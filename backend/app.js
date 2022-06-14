const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const ejs = require('ejs');
const path = require('path');

// express app
const app = express();
app.set('view engine', 'ejs');

app.use(express.json());

//--------- Mongo db connection

mongoose.connect('mongodb://localhost:27017/stockMarket', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected db successfully');
  }
});

//------------routes
app.use('/', require('./routes/home'));

//listening on port PORT

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
