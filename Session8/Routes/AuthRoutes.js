const express = require("express");
const { login, singnup } = require("../Controllers/AuthController");

const router = express.Router();

//  "v1/activity/users/"

router.post("/login", login)
router.post("/register", singnup)


module.exports = router;