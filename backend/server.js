const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// middleware's
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
  res.status(200).send("<h2>Home page...</h2>")
})


const PORT = process.env.PORT || 5000;

// connect to mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
  app.listen(PORT, () => {
    console.log(`Listen to port: ${PORT}`)
  });
  })
  .catch((error) => {
    console.log(error);
})

