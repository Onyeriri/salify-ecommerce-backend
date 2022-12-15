const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");
const contactRoute = require("./routes/contactRoute");

const app = express();

// middleware's
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes middleware's
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contact", contactRoute);

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
