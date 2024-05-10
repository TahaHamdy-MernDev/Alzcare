const dbService = require("../../utils/dbService");
const asyncHandler = require("../../utils/asyncHandler");
const TestModel = require("../../models/testModel");
const { uploadAndSet, deleteOldFiles, updateFiles } = require("../../utils/cloudinary");
exports.getAllTests = asyncHandler(async (req, res) => {
    const tests = await dbService.findMany(TestModel, { user: req.params.id })
    res.success({ data: tests })
})
exports.getTestById = asyncHandler(async (req, res) => {
    const test = await dbService.findOne(TestModel, { _id: req.params.id })
    if (!test) {
        return res.recordNotFound('Test')
    }
    res.success({ data: test })
})
exports.createTest = asyncHandler(async (req, res) => {
    await uploadAndSet(req, 'testImage')
    const data = { ...req.body, user: req.user._id }
    const test = await dbService.create(TestModel, data)
    res.success({ data: test })
})
exports.updateTest = asyncHandler(async (req, res) => {
    const testToUpdate = await dbService.findOne(TestModel, { _id: req.params.id })
    if (!testToUpdate) {
        return res.recordNotFound('Test')
    }
    await updateFiles(req, testToUpdate, 'testImage');
    const updatedTest = await dbService.updateOne(TestModel, { _id: req.params.id }, { ...req.body })
    res.success({ data: updatedTest })
})
exports.deleteTest = asyncHandler(async (req, res) => {
    const deletedTest = await dbService.deleteOne(TestModel, { _id: req.params.id })
    if (!deletedTest) {
        return res.recordNotFound('Test')
    }
    await deleteOldFiles(deletedTest, 'testImage')
    res.success({ data: req.params.id })
})