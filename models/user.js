const mongoose = require('mongoose');
const Joi = require('joi');

//model for user
const userschema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true }
});

const User = mongoose.model('User', userschema);

//function to validate a user
function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(6).max(35).required(),
        password: Joi.string().min(6).max(35).required(),
        firstName: Joi.string().min(3).max(55).required()
    });
    return schema.validate(user);
}

module.exports = { User, validateUser };