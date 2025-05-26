const { Schema, default: mongoose } = require("mongoose");
const validtor = require("validator");


const blogSchema = new Schema({
    title: {type: String, required: true, unique: true, minlength: 9, maxlength: 100},
    content: {type: String, required: true},
    phone: {type: String, required: true, validate: (data) => validtor.isMobilePhone(data)},
    email: {type: String, required: true , validate: (data) => validtor.isEmail(data)},
    authors: [String]
}, {timestamps: true});


// to connect blogSchema to actual blog collection in DB 
module.exports = mongoose.model("blogs", blogSchema);


// [1,2,3,4] 5
// $in no
// $nin yes
