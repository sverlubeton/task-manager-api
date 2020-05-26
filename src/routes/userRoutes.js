const {Router} = require('express')
const userControllers = require('../controllers/userControllers')
const upload = require('../config/multer')
const auth = require('../middleware/auth')
const User = require('../models/user')

const app = Router()

app.post('/', userControllers.signIn)

app.post('/login',userControllers.signUp)

app.post('/logout', auth, userControllers.logOut)

app.post('/logoutAll', auth, userControllers.logOutAll)

app.get('/me', auth, userControllers.myProfile)

app.get('/:id', auth, userControllers.readUser)

app.patch('/me', auth, userControllers.myProfileUpdate)

app.delete('/me', auth, userControllers.myProfileDelete)

app.post('/me/avatar', auth, upload.single('avatar'), userControllers.addAvatar)

app.delete('/me/avatar', auth, userControllers.deleteAvatar)

app.get('/:id/avatar', userControllers.getAvatarByID)

module.exports = app