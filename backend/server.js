const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

// middleware's
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// routes middleware's
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// routes
app.get("/", (req, res) => {
  res.status(200).send("<h2>Home page...</h2>");
});

// error middleware
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

// connect to mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listen to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
