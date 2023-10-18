const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/usersCtrl");

router.post("/signup", usersCtrl.createUser);
router.post("/login", usersCtrl.loginUser);

module.exports = router;
