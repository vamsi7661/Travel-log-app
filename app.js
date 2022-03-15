const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cros = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
const db = "mongodb://localhost:27017/example";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;
database.once("open", (_) => {
  console.log("Database connected:", db);
});

const userRoutes = require("./apis/routes/users");
const travelUsersRoutes = require("./apis/routes/travelUser");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.json())
app.use(bodyParser.json());
app.use(
  "/Users/Vamsi Krishna/Desktop/Travel log/server/images",
  express.static("images")
);

//Cross Origin Resource Sharing
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "Options") {
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
    return res.status(200).json({});
  }
  next();
});
//or
// app.use(cros())

app.use("/users", userRoutes);
app.use("/travelusers", travelUsersRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
  next();
});

module.exports = app;
