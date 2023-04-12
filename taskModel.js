const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a task!']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const taskModel = mongoose.model('Task', TaskSchema)

module.exports = taskModel


