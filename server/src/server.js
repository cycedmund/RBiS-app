require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("RBiS:server:src:server");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("/api", (req, res) => {
  res.send("Hello World");
});

//? Last route -> for react router
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

const PORT = process.env.PORT || 27017;

app.listen(PORT, () => {
  debug(`Express running on port ${PORT}`);
});
