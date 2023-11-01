const { expressjwt } = require("express-jwt");
const sendResponse = require("../helpers/sendResponse");
const guard = require("express-jwt-permissions")({
  requestProperty: "auth",
  permissionsProperty: "user.role",
});
const debug = require("debug")("RBiS:server:config:isAuthorised");

const isAuthorised = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  getToken: (req) => {
    let token = req.get("Authorization") || req.query.token;
    token = token ? token.replace("Bearer ", "") : null;
    debug("token from isAuth:", token);
    return token;
  },
}).unless({ path: ["/api/users/signup", "/api/users/login"] });

const unauthorizedError = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return sendResponse(res, 401, null, "Unauthorized");
  }
  next(err);
};

const verifyInstructor = (req, res, next) => {
  guard.check("instructor")(req, res, (err) => {
    if (err) {
      debug("Error in verifyInstructor:", err);
      return sendResponse(res, 403, null, "Forbidden");
    }
    next();
  });
};

const verifyTrainee = (req, res, next) => {
  guard.check("trainee")(req, res, (err) => {
    if (err) {
      debug("Error in verifyTrainee:", err);
      return sendResponse(res, 403, null, "Forbidden");
    }
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  guard.check("admin")(req, res, (err) => {
    if (err) {
      debug("Error in verifyAdmin:", err);
      return sendResponse(res, 403, null, "Forbidden");
    }
    next();
  });
};

const verifyAdminInstructor = (req, res, next) => {
  guard.check([["instructor"], ["admin"]])(req, res, (err) => {
    if (err) {
      debug("Error in verifyAdminInstructor:", err);
      return sendResponse(res, 403, null, "Forbidden");
    }
    next();
  });
};

const verifyAll = (req, res, next) => {
  guard.check([["instructor"], ["admin"], ["trainee"]])(req, res, (err) => {
    if (err) {
      debug("Error in verifyAll:", err);
      return sendResponse(res, 403, null, "Forbidden");
    }
    next();
  });
};

module.exports = {
  isAuthorised,
  unauthorizedError,
  verifyInstructor,
  verifyTrainee,
  verifyAdmin,
  verifyAdminInstructor,
  verifyAll,
};
