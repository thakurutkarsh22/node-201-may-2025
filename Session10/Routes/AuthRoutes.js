const express = require("express");
const { login, singnup } = require("../Controllers/AuthController");
const UserModel = require("../Models/UserModel");
const router = express.Router();
const passport = require("passport");

const AuthMiddleware = passport.authenticate("jwt", {
    session: false
})




router.post("/login", login)
router.post("/register", singnup)
router.get("/getAllUsers", AuthMiddleware,  async (req, res) => {
    const result = await UserModel.find({})
    res.json(result);
})


module.exports = router;