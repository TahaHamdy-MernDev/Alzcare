const common = require("../utils/common");
const dbService = require("../utils/dbService");
const asyncHandler = require("../utils/asyncHandler");
const { createSendToken } = require("../utils/createSendToken");
const authConstant = require("../constants/authConstant");
const User = require("../models/userModel");

exports.PatientRegister = asyncHandler(async (req, res) => {
  const { Uname, mail, password } = req.body;

  const patientCode = await common.generatePatientCode();

  const data = new User({
    Uname,
    mail,
    password,
    patientCode,
    userType: authConstant.USER_TYPES.Patient,
  });

  const uniqueFields = ["mail"];
  const checkUniqueFields = await common.checkUniqueFieldsInDatabase(
    User,
    uniqueFields,
    data,
    "REGISTER"
  );

  if (checkUniqueFields.isDuplicate) {
    return res.validationError({
      message: `this ${checkUniqueFields.field} is already in use... ! `,
    });
  }

  await dbService.create(User, data);

  res.success({ message: "patient account successfully created ...!" });
});

exports.CareGiverRegister = asyncHandler(async (req, res) => {
  const { Uname, mail, patientCode, password } = req.body;
  const patient = await dbService.findOne(User, { patientCode });
  if (!patient) {
    return res.failure({ message: "There is no patient with this code...!" });
  }

  const data = new User({
    Uname,
    mail,
    password,
    patientCode,
    userType: authConstant.USER_TYPES.CareGiver,
  });

  const uniqueFields = ["mail"];
  const checkUniqueFields = await common.checkUniqueFieldsInDatabase(
    User,
    uniqueFields,
    data,
    "REGISTER"
  );

  if (checkUniqueFields.isDuplicate) {
    return res.validationError({
      message: `this ${checkUniqueFields.field} is already in use... !`,
    });
  }

  data.patients.push(patient._id);

  patient.careGiver_ID = data._id;

  await dbService.create(User, data);
  await patient.save();
  res.success({ message: "Care Giver Account Successfully Created ...!" });
});

exports.login = asyncHandler(async (req, res) => {
  const user = await dbService.findOne(User, { mail: req.body.mail });

  if (!user) {
    return res.failure({ message: "there is no user with this email...!" });
  }

  const isPasswordMatched = await user.isPasswordMatch(req.body.password);
  if (!isPasswordMatched) {
    return res.failure({ message: "Wrong Password...!" });
  }

  createSendToken(user, res);
});

exports.getCurrentUser = asyncHandler(async (req, res) => {
  const user = await dbService.findOne(User, { _id: req.user._id });
  if (!user) {
    return res.failure({ message: "user not found...!" });
  }
  res.success({ data: user });
});
