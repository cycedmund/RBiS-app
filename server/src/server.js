require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("RBiS:server:src:server");
const { isAuthorised } = require("./config/isAuthorised");

//* Routers
const usersRouter = require("./routes/usersRouter");
const coursesRouter = require("./routes/coursesRouter");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.use(isAuthorised);

app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);

//? Last route -> for react router
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, function () {
  debug(`Express running on port ${PORT}`);
});
