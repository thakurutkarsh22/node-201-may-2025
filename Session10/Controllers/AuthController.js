const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const AuthService = require("../Service/AuthService");

async function singnup(req, res) {

    const body = req.body;
    const email = body.email;
    const name = body.name;
    const password = body.password; // plain password
    const username = body.username;

    const nationality= "INDIAN"

    const userobj = UserModel({
        email,
        name,
        password: await encryptpassword(password),
        username,
        nationality
    })

    try {
        const response = await userobj.save(); // here we are taking to DB it take time to talk so we have to wait for it
        res.status(201).json(response); // 201 I am send back bec I have created a new resource
    } catch(error) {
        res.status(500).json(error);
    }
}


async function encryptpassword(visiblePassword) {
    const salt = await bcrypt.genSalt(); // to generate difference hashed password even if visiblePassword is same 
    const hashedPassword = await bcrypt.hash(visiblePassword, salt);
    return hashedPassword;
}


async function login(req, res) {

    const body = req.body;
    const username = body.username;
    const password = body.password;

    const result = await AuthService.loginService(username, password);

    if(result.isLogged) {
        res.status(200).json(result);
    } else {
        res.status(404).json({error: "error"});
    }

}




module.exports = {singnup, login }