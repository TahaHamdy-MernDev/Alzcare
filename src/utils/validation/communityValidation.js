const Joi = require("joi")

exports.createPostKeys = Joi.object({
    text: Joi.string(),
    image: Joi.string()
})
exports.createCommentKeys = Joi.object({
    text: Joi.string(),
    image: Joi.string()
})