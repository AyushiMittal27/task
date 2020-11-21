const express = require("express");
const mongoose = require("mongoose");
const getResult = require("./controller");
require("dotenv").config();
const app = express();

//middlewares
app.use(express.json({ extended: false }));

app.post(
  "/",
  (req, res, next) => {
    console.log("request received");
    next();
  },
  getResult
);

mongoose
  .connect("mongodb://localhost:27017/cabs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("db connected"));

const port = process.env.PORT || 5400;
app.listen(port, () => {
  console.log(`The server is up on port ${port}`);
});
