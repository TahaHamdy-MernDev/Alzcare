const Joi = require("joi")

exports.createPostKeys = Joi.object({
    text: Joi.string()
        .min(3)
        .max(500),
    image: Joi.string()
}).xor('text', 'image');
exports.createCommentKeys = Joi.object({
    text: Joi.string()
        .min(3)
        .max(500),
    image: Joi.string()
}).xor('text', 'image');