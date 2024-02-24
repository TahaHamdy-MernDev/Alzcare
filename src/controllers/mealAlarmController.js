const MealAlarmModel = require("../controllers/mealAlarmController")
const databaseService = require("../utils/dbService");
const asyncHandler = require("../utils/asyncHandler");
exports.getAllUserMealAlarm = asyncHandler(async (req, res) => {
    const mealAlarms = await databaseService.findMany(MealAlarmModel, { user: req.params.id })
    res.success({ data: mealAlarms })
})
exports.createMealAlarm = asyncHandler(async (req, res) => {
    const data = { ...req.body, user: req.user._id }
    const mealAlarm = await databaseService.create(MealAlarmModel, data)
    res.success({ data: mealAlarm })
})

exports.getMealAlarmById = asyncHandler(async (req, res) => {
    const mealAlarm = await databaseService.findOne(MealAlarmModel, { _id: req.params.id });
    if (!mealAlarm) { return res.recordNotFound({ message: 'Meal alarm not found' }) }
    res.success({ data: mealAlarm });
})
exports.updateMealAlarm = asyncHandler(async (req, res) => {
    const updatedMealAlarm = await databaseService.updateOne(MealAlarmModel, { _id: req.params.id }, { ...req.body })
    if (!updatedMealAlarm) {
        return res.recordNotFound({ message: 'Meal alarm not found' })
    }
    res.success({ data: updatedMealAlarm })
})

exports.deleteMealAlarm = asyncHandler(async (req, res) => {
    const deletedMealAlarm = await databaseService.deleteOne(MealAlarmModel, { _id: req.params.id })
    if (deletedMealAlarm) {
        return res.recordNotFound({ message: 'Meal alarm not found' })
    }
    res.success({ data: deletedMealAlarm })
})