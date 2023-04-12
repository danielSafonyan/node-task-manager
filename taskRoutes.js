const express = require('express')
const {
    getAllTasks,
    createSingleTask,
    getSingleTask,
    deleteSingleTask,
    updateSingleTask
} = require('./taskController')

const taskRouter = express.Router()

taskRouter.route('/')
    .get(getAllTasks)
    .post(createSingleTask)

taskRouter.route('/:id')
    .get(getSingleTask)
    .delete(deleteSingleTask)
    .patch(updateSingleTask)

module.exports = taskRouter