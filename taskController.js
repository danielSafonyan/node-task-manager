const TaskModel = require('./taskModel')
const craeteCustomApiError = require('./CustomApiError')

function tryWrapper(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}

const getAllTasks = tryWrapper(async (req, res) => {
    const tasks = await TaskModel.find()
    res.status(200).json({ tasks })
})

const createSingleTask = tryWrapper(async (req, res) => {
    const taskName = req.body.name
    const createdTask = await TaskModel.create({name: taskName})
    res.status(200).json({createdTask})
})

const getSingleTask = tryWrapper(async (req, res, next) => {
        const taskId = req.params.id
        const task = await TaskModel.findOne({_id: taskId})
        if (!task) {
            return next(craeteCustomApiError('Task Not Found', 404))
        }
        res.status(200).json({ task })
})

const deleteSingleTask = tryWrapper(async (req, res) => {
    const taskId = req.params.id
    const task = await TaskModel.findOneAndDelete({_id: taskId})
    if (!task) {
        return next(craeteCustomApiError('Task Not Found', 404))
    }
    res.status(200).json({ success: true, task })
})

const updateSingleTask = tryWrapper(async (req, res) => {
        const taskName = req.body.name
        const taskId = req.params.id
        const task = await TaskModel.findOneAndUpdate({_id: taskId}, {name: taskName}, {new: true})
        if (!task) {
            return next(craeteCustomApiError('Task Not Found', 404))
        }
        res.status(200).json({ success: true, task } )
})



module.exports = {
    getAllTasks,
    createSingleTask,
    getSingleTask,
    deleteSingleTask,
    updateSingleTask
}