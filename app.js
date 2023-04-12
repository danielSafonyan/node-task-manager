require('dotenv').config()
const connectDB = require('./db')
const express = require('express')
const taskRouter = require('./taskRoutes')

const app = express()

app.use(express.json())
app.use('/api/v1/tasks', taskRouter)
app.use(express.static('./public'))
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that page!")
})
app.use((err, req, res, next) => {
  res.status(err.status).json({ success: false, status: err.status, message: err.message })
})

const port = process.env.PORT

startServer()

async function startServer() {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Listening on port ${port}.`))
    } catch (err) {
        console.log("Server couldn't start.")
        console.log(err)
    }
}