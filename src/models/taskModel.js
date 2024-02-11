const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
    },
    remindMeIn: {
        day: {
            type: String,
        },
        hour: {
            type: String,
        },
    },
    reminder: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

const TaskModel = model("Task", taskSchema);

module.exports = TaskModel;