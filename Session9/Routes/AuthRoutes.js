const express = require("express");
const { login, singnup } = require("../Controllers/AuthController");
const UserModel = require("../Models/UserModel");
const AuthMiddleware = require("../Middleware/AuthMiddleware");

const router = express.Router();

//  "v1/activity/users/"

router.post("/login", login)
router.post("/register", singnup)
router.get("/getAllUsers", AuthMiddleware,  async (req, res) => {
    const result = await UserModel.find({})
    res.json(result);
})


module.exports = router;