const debug = require("debug")("RBiS:server:controllers:usersCtrl");
const jwt = require("jsonwebtoken");

module.exports = function createJWT(user) {
  debug("jwt user", user);
  debug("jwt user", process.env.JWT_SECRET);
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "24h" });
};
