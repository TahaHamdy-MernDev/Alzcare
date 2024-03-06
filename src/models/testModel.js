const { Schema, model } = require("mongoose");

const testSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
    date: {
        type: Date,
        required: true
    },
    testName: {
        type: String,
        required: true
    },
    laboratoryName: {
        type: String,
        required: true
    },
    attendingPhysician: {
        type: String,
        required: true
    },
    testImage: {
        type: Object,
        default: {
            url: "",
            publicId: null
        }
    },
});

const TestModel = model('Test', testSchema);
module.exports = TestModel