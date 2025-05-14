const express = require("express");
const { getAllUser, getUserByGender, getUserByUserName } = require("../Controllers/UserActivityController");
const AuthMiddleware = require("../Middleware/AuthMiddleware");

const router = express.Router();

//  "v1/activity/users/"

router.get("/", AuthMiddleware  ,getAllUser)
router.get("/search",AuthMiddleware, getUserByGender)
router.get("/search/user/:userName", getUserByUserName)


module.exports = router;