const {
  uploadAndSet,
  deleteOldFiles,
  updateFiles,
} = require("../../utils/cloudinary");
const TestModel = require("../../models/testModel");
const asyncHandler = require("../../utils/asyncHandler");
const dbService = require("../../utils/dbService");

exports.getAllPatientTests = asyncHandler(async (req, res) => {
  const query = { user: req.user.patient };
  const tests = await dbService.findMany(TestModel, query);
  res.success({ data: tests });
});

exports.getPatientTest = asyncHandler(async (req, res) => {
  const query = {_id: req.params.id}
  const test = await dbService.findOne(TestModel, query);
  if (!test) {
    return res.recordNotFound("Test");
  }
  res.success({ data: test });
});
exports.createPatientTest = asyncHandler(async (req, res) => {
  await uploadAndSet(req, "testImage");
  const data = { ...req.body, user: req.user.patient };
  const test = await dbService.create(TestModel, data);
  res.success({ data: test });
});
exports.updatePatientTest = asyncHandler(async (req, res) => {
  const testToUpdate = await dbService.findOne(TestModel, {
    _id: req.params.id,
  });
  if (!testToUpdate) {
    return res.recordNotFound("Test");
  }
  await updateFiles(req, testToUpdate, "testImage");
  const updatedTest = await dbService.updateOne(
    TestModel,
    { _id: req.params.id },
    { ...req.body }
  );
  res.success({ data: updatedTest });
});
exports.deletePatientTest = asyncHandler(async (req, res) => {
  const deletedTest = await dbService.deleteOne(TestModel, {
    _id: req.params.id,
  });
  if (!deletedTest) {
    return res.recordNotFound("Test");
  }
  await deleteOldFiles(deletedTest, "testImage");
  res.success({ data: req.params.id });
});
