const common = require("../utils/common");
const dbService = require("../utils/dbService");
const asyncHandler = require("../utils/asyncHandler");
const { createSendToken } = require("../utils/createSendToken");
const authConstant = require("../constants/authConstant");
const User = require('../models/userModel')

/**
 * Registers a new patient.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the patient account is successfully created.
 */
exports.PatientRegister = asyncHandler(async (req, res) => {
  const { Uname, mail, password } = req.body;

  // Generate a unique patient code
  const patientCode = await common.generatePatientCode();

  // Create a new User object with the provided data
  const data = new User({
    Uname, mail, tel, password, patientCode,
    userType: authConstant.USER_TYPES.Patient,
  });

  // Check if the email and telephone number are unique in the database
  const uniqueFields = ["mail"];
  const checkUniqueFields = await common.checkUniqueFieldsInDatabase(
    User,
    uniqueFields,
    data,
    "REGISTER"
  );

  // If the email or telephone number is already in use, return a validation error
  if (checkUniqueFields.isDuplicate) {
    return res.validationError({ message: `this ${checkUniqueFields.field} is already in use... ! ` });
  }

  // Create the patient account in the database
  await dbService.create(User, data);

  // Return a success response
  res.success({ message: "patient account successfully created ...!" });
});

/**
 * Registers a new care giver.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the care giver account is successfully created.
 */
exports.CareGiverRegister = asyncHandler(async (req, res) => {
  const { Uname, mail, patientCode, password } = req.body;

  // Find the patient with the provided patient code
  const patient = await dbService.findOne(User, { patientCode });
  if (!patient) {
    return res.failure({ message: "There is no patient with this code...!" });
  }

  // Create a new User object with the provided data
  const data = new User({
    Uname, mail, password, patientCode,
    userType: authConstant.USER_TYPES.CareGiver,
  });

  // Check if the email and telephone number are unique in the database
  const uniqueFields = ["mail"];
  const checkUniqueFields = await common.checkUniqueFieldsInDatabase(
    User,
    uniqueFields,
    data,
    "REGISTER"
  );

  // If the email or telephone number is already in use, return a validation error
  if (checkUniqueFields.isDuplicate) {
    return res.validationError({ message: `this ${checkUniqueFields.field} is already in use... !` });
  }

  // Add the patient to the care giver's list of patients
  data.patients.push(patient._id);

  // Set the care giver ID for the patient
  patient.careGiver_ID = data._id;

  // Create the care giver account in the database
  await dbService.create(User, data);
  await patient.save();

  // Return a success response
  res.success({ message: "Care Giver Account Successfully Created ...!" });
});

/**
 * Logs in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is successfully logged in.
 */
exports.login = asyncHandler(async (req, res) => {
  const user = await dbService.findOne(User, { mail: req.body.mail });

  // Check if the user exists
  if (!user) {
    return res.failure({ message: "there is no user with this email...!" });
  }

  // Check if the password matches
  const isPasswordMatched = await user.isPasswordMatch(req.body.password);
  if (!isPasswordMatched) {
    return res.failure({ message: "Wrong Password...!" });
  }

  // Create and send a token for authentication
  createSendToken(user, res);
});

/**
 * Gets the current user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the current user is retrieved.
 */
exports.getCurrentUser = asyncHandler(async (req, res) => {
  const user = await dbService.findOne(User, { _id: req.user.id });
  if (!user) {
    return res.failure({ message: "user not found...!" });
  }
  res.success({ data: user });
});
