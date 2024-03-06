const Joi = require("joi");

const testSchemaKeys = Joi.object({
  date: Joi.string().required().messages({
    "string.base": `{{date}} should be a valid date`,
    "any.required": `Date is a required field`,
  }),
  testName: Joi.string().required().messages({
    "string.base": `testName" should be a type of 'text'`,
    "any.required": `"testName" is a required field`,
  }),
  laboratoryName: Joi.string().required().messages({
    "string.base": `laboratoryName should be a type of 'text'`,
    "any.required": `laboratoryName is a required field`,
  }),
  attendingPhysician: Joi.string().required().messages({
    "string.base": `attendingPhysician should be a type of 'text'`,
    "any.required": `attendingPhysician is a required field`,
  }),
  testImage: Joi.string(),
});
const updateTestSchema= testSchemaKeys.fork(
    [ "date", "testName", "laboratoryName", "attendingPhysician"],(schema) => schema.optional()
  )
module.exports = {
  testSchemaKeys,
  updateTestSchema
};

// const Joi = require("joi");

// module.exports = {
//   TestSchemaKeys: Joi.object({
//     date: Joi.date().required().messages({
//       "date.base": `"date" should be a valid date`,
//       "any.required": `"date" is a required field`,
//     }),
//     testName: Joi.string().required().messages({
//       "string.base": `"testName" should be a type of 'text'`,
//       "any.required": `"testName" is a required field`,
//     }),
//     laboratoryName: Joi.string().required().messages({
//       "string.base": `"laboratoryName" should be a type of 'text'`,
//       "any.required": `"laboratoryName" is a required field`,
//     }),
//     attendingPhysician: Joi.string().required().messages({
//       "string.base": `"attendingPhysician" should be a type of 'text'`,
//       "any.required": `"attendingPhysician" is a required field`,
//     }),
//     testImage: Joi.string(),
//   }),

//   updateTestSchema: TestSchemaKeys.fork(
//     ["user", "date", "testName", "laboratoryName", "attendingPhysician"],
//     (schema) => schema.optional()
//   ),
// };
