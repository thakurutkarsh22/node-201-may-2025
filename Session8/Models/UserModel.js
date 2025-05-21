const { Schema, default: mongoose } = require("mongoose");
const validator = require('validator');

const userSchema = new Schema({
    name: {type: String, required: true, validate: (data) => validator.isAlpha(data)},
    username: {type: String, unique: true, required: true, validate: (data) => validator.isAlphanumeric(data)},
    email: {type: String, unique: true, required: true, validate: (data) => validator.isEmail(data)},
    password: { type: String, required: true, minlength: 8, maxlength: 1000},
    nationality: {type: String}
})

module.exports = mongoose.model("users", userSchema);