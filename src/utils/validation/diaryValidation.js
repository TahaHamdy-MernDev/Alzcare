const joi = require('joi');
module.exports={
    createDiaryKeys: joi.object({
    title: joi.string().required().messages({
        'string.empty': 'Title cannot be empty',
        'any.required': 'Title is required',
    }),
    details: joi.string().required().messages({
        'string.empty': 'Details cannot be empty',
        'any.required': 'Details are required',
    }),
    voiceNote: joi.string(),
    image: joi.string(),
    video: joi.string()
}),
    updateDiaryKeys: joi.object({
    title: joi.string().required().messages({
        'string.empty': 'Title cannot be empty',
        'any.required': 'Title is required',
    }),
    details: joi.string().required().messages({
        'string.empty': 'Details cannot be empty',
        'any.required': 'Details are required',
    }),
    voiceNote: joi.string(),
    image: joi.string(),
    video: joi.string()
}),

}
