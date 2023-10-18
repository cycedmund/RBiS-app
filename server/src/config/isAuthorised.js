const { expressjwt } = require("express-jwt");
// require("dotenv").config();
// const debug = require("debug")("RBiS:server:config:isAuthorised");

const isAuthorised = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  getToken: (req) => {
    return req.get("Authorization") || req.query.token;
  },
}).unless({ path: ["/api/users"] });

module.exports = { isAuthorised };
