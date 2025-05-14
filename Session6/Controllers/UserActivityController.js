const userData = require("../usersData");

const MT_SECRET_PASSWORD = "asdf1234"

function getAllUser(req, res) {
    res.json(userData.data);    
}

// REquest HANDLER
function getUserByGender(req, res)  {
    const query = req.query;
    const searchedGender = query.gender;

    const filteredData = userData.data.filter(user => user.gender === searchedGender)
    res.json(filteredData);
}

function getUserByUserName(req, res) {
    const params = req.params;
    const searchedFirstName = params.userName;

    const filteredData = userData.data.filter(user => user.name.first === searchedFirstName)
    res.json(filteredData);
}

module.exports = {getAllUser, getUserByGender, getUserByUserName}