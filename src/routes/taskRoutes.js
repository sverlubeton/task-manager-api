const {Router} = require('express')
const auth = require('../middleware/auth')
const taskControllers = require('../controllers/taskControllers')

const app = Router()

app.post('/', auth, taskControllers.addTask)

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:asc
app.get('/', auth, taskControllers.getTasks)

app.get('/:id', auth, taskControllers.getTaskbyID)

app.patch('/:id', auth,  taskControllers.updateTask)

app.delete('/:id', auth, taskControllers.deleteTask)

module.exports = app