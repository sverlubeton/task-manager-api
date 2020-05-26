const User = require('../models/user')
const sharp = require('sharp')

exports.signIn = async (req, res, next) => {
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
        
    } catch(e) {
        res.status(400).send(e)
    }
}

exports.signUp = async (req, res, next) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch(e) {
        res.status(400).send()
    }
}

exports.logOut = async (req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
}

exports.logOutAll = async (req, res, next) => {
    try {
        req.user.tokens =[]
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
}

exports.readUser = async(req, res, next) => {
    const _id = req.params.id
      try{
        const user = await User.findById(_id)
        if(!user) {
          return res.status(404).send()
        }
    
        res.send(user)
      } catch(e) {
        res.status(500).send(e)
      }
    
}

exports.myProfile = async (req, res, next) => {
    res.send(req.user)
}

exports.myProfileUpdate = async (req, res, next) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) =>req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.myProfileDelete = async (req, res, next) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch(e) {
        res.status(500).send()
    }
}

exports.addAvatar = async (req, res, next) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height:250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
}

exports.deleteAvatar = async (req, res, next) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}

exports.getAvatarByID = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch(e) {
        res.status(404).send()
    }
}
