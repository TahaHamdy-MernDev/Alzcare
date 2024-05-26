const Joi = require("joi");

exports.createPostKeys = Joi.object({
    text: Joi.string().allow('').empty(''),
    image: Joi.string().allow('').empty('')
});

exports.createCommentKeys = Joi.object({
    text: Joi.string().allow('').empty(''),
    image: Joi.string().allow('').empty('')
});
