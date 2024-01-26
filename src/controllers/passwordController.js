const common = require("../utils/common");
const dbService = require("../utils/dbService");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/userModel");
const ResetPassword = require("../models/resetPasswordModel");
const { sendMail } = require("../services/email");
const bcrypt = require("bcrypt")
exports.ForgotPassword = asyncHandler(async (req, res) => {
    const { mail } = req.body;
    const user = await dbService.findOne(User, { mail });
    if (!user) { return res.recordNotFound({ message: "There is no user with this email...!" }) }
    const verification_code = await dbService.findOne(ResetPassword, { user: user._id });
    if (verification_code) {
        const expirationTime = new Date(verification_code.createdAt.getTime() + 300 * 1000);
        const currentTime = new Date();
        let remainingMinutes = common.getDifferenceOfTwoDatesInTime(currentTime, expirationTime)
        return res.failure({ message: `you can send code agin after : ${remainingMinutes}` })
    }
    let code = common.randomNumber();
    let mailObj = {
        subject: 'Your Password!',
        to: user.mail,
        template: '/views/email/ResetPassword',
        data: { code: code, userName: user.Uname }
    };
    await sendMail(mailObj)
    await dbService.create(ResetPassword, { user: user._id, verification_code: code });
    res.success({  message: "check your mail for code ...!" })
})
exports.CheckCode = asyncHandler(async (req, res) => {
    const verification_code = await dbService.findOne(ResetPassword, { verification_code: req.body.code });
    if (!verification_code) { return res.recordNotFound({ message: "your code has been expired..!" }) }
    res.success({ data: { userId: verification_code.user } })
})
exports.ResetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body
    const user = await dbService.findOne(User, { _id: req.params.userId });

    if (!user) { return res.recordNotFound({ message: "your code has been expired" }) }
    const hash = await bcrypt.hash(password, 12);
    user.password = hash
    await user.save()
    res.success({ message: "user successfully changes his password" })
})