const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../Config/util");


class AuthService{

    static async loginService(username, password) {
        try {

            const userArray = await AuthService.findUserByUserName(username);


            if(!userArray || !userArray.length) {
                // if user is not there. 
                return {
                    isLogged: false
                }
            } else {
                const userPassword = userArray[0].password; // 1xc%^///##@@e

                const result = await bcrypt.compare(password, userPassword); // true or false
                
                let token = "";

                if(result) {
                    // it means user passwrd matches
                    token = jwt.sign({username: userArray[0].username, "asafsaf": "helo"}, JWT_KEY, {
                        expiresIn: "100000ms"
                    })
                }


                return {
                    isLogged: result,
                    user: userArray[0],
                    token
                }

            }
        } catch(error) {
            return {
                isLogged: false
            }
        }
    }

    static async findUserByUserName(searchedUsername) {
        const user = await UserModel.find({ username:  searchedUsername});
        return user;
    }
}

module.exports = AuthService;