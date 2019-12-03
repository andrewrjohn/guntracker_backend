const express = require('express')
const userSchema = require('../schemas/userSchema')
const router = express.Router()
const mongoose = require('mongoose')

router.post('/users', async (req, res) => {
    if (req.body) {
        const { phone, password, _id } = req.body
        const User = mongoose.model('User', userSchema)
        const newUser = new User({ _id, phone, password })
        if (User.findOne({ phone })) {
            res.status(400)
            return res.send(`User with phone number (${phone}) already exists`)
        }
        try {
            await newUser.save()
            res.send(newUser)
        } catch (err) {
            res.status(400)
            res.send(err.errors)
        }
    }
})

module.exports = router