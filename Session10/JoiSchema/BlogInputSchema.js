const Joi = require("joi");


const BlogInputSchema = Joi.object({
    title: Joi.string().min(9).max(101).required(),
    content: Joi.string().min(9).max(2000).required(),
    phone: Joi.string().min(10).max(10).required(),
    email: Joi.string().required(),
});



/**
 * 
 * @param {
 * {
    "title": "good gheading7",
    "content": "India was victorous and they won by 5 wickets remaining",
    "email": "asdasdasdas@gmail.com",
    "phone": "1231231231",
    "xyz": "asdadasd",
    "yyy": "hello world",
    "1234xyz": "garbage",
    "garbage1": "hellow world"
}} userInput 
 */

function validateUserInput(userInput) {
    const isValidInput = BlogInputSchema.validate(userInput);
    return isValidInput;
}

module.exports = {validateUserInput, BlogInputSchema }