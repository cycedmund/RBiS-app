const mongoose = require("mongoose");
const debug = require("debug")("RBiS:server:config:database");

mongoose.set("debug", true);
mongoose.set("strict", true);
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("connected", () => {
  debug(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
