const { Schema, model } = require("mongoose")

const diarySchema = new Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    voiceNote: {
        type: Object,
        default: {
            url: "",
            publicId: null,
        },
    },
    image: {
        type: Object,
        default: {
            url: "",
            publicId: null,
        },
    },
    video: {
        type: Object,
        default: {
            url: "",
            publicId: null,
        },
    },
}, { timestamps: true });

const Diary = model("Diary", diarySchema);

module.exports = Diary;