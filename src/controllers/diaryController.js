
const dbService = require("../utils/dbService");
const asyncHandler = require("../utils/asyncHandler");
const Diary = require("../models/diaryModel");
const { uploadAndSet, deleteOldFiles, updateFiles, deleteManyFiles } = require("../utils/cloudinary");
exports.getAllDiaries = asyncHandler(async (req, res) => {
    const diaries = await dbService.findMany(Diary, { user: req.user._id })
    res.success({ data: diaries })
})

exports.getDiaryById = asyncHandler(async (req, res) => {
    const diary = await dbService.findOne(Diary, { _id: req.params.id })
    if (!diary) { return res.recordNotFound() }
    res.success({ data: diary })
})

exports.createDiary = asyncHandler(async (req, res) => {
    const { title, details } = req.body;
    const fileTypes = ['image', 'video', 'voiceNote'];
    for (let type of fileTypes) {
        await uploadAndSet(req, type);
    }
    const data = { ...req.body, user: req.user._id, title, details }
    const newDiary = await dbService.create(Diary, data)
    res.success({ data: newDiary })
})

exports.updateDiary = asyncHandler(async (req, res) => {
    const { title, details } = req.body;
    const diaryToUpdate = await dbService.findOne(Diary, { _id: req.params.id })
    if (!diaryToUpdate) { return res.recordNotFound(); }
    const fileTypes = ['image', 'video', 'voiceNote'];
    for (let type of fileTypes) {
        await updateFiles(req, diaryToUpdate, type);
    }
    const dataToUpdate = { ...req.body, title, details }
    const updatedDiary = await dbService.updateOne(Diary, diaryToUpdate._id, dataToUpdate)
    res.success({ data: updatedDiary });
})
exports.deleteDiary = asyncHandler(async (req, res) => {
    const fileTypes = ['image', 'video', 'voiceNote'];
    const diaryToDelete = await dbService.findOne(Diary, { _id: req.params.id })
     if (!diaryToDelete) {
        return res.recordNotFound();
    }
    await deleteManyFiles(diaryToDelete, fileTypes)
    
    await dbService.deleteOne(Diary, diaryToDelete._id);
    return res.success({ message: "Diary Deleted Successfully" });

})