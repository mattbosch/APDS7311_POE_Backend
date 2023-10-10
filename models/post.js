const mongoose = require('mongoose')
const Joi = require('joi');

//model for post
const postschema = mongoose.Schema(
    {
        title: { type: String, required: true},
        description: { type: String, required: true},
        departmentCode: { type: String, required: true}
    }
)
const Post = mongoose.model('Post', postschema)

//function to validate a post
function validatePost(post){
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required(),
        description: Joi.string().min(3).max(50).required(),
        departmentCode: Joi.string().min(3).max(50).required()
    })
    return schema.validate(post)
}
module.exports = { Post, validatePost };