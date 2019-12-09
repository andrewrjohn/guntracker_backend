const express = require('express')
const User = require('../models/User')
const router = express.Router()
const auth = require('../middleware/auth')
const Token = require('../models/Token')
const { API_COOKIE_NAME, API_MAX_AGE } = require('../constants/api')

router.post('/auth/logout', auth, async (req, res) => {
    try {
        const token = await Token.findOne({ token: req.token })

        // Remove token ref
        const user = await User.findOne({ _id: token.ownerId }).populate('tokens')
        user.tokens = user.tokens.filter((t) => t.token !== token.token)
        await user.save()

        // // Remove actual token
        await token.remove()
        res.clearCookie(API_COOKIE_NAME)
        res.sendStatus(200)
    } catch (err) {
        res.status(400).send({ err })
    }
})

router.get('/auth/profile', auth, async (req, res) => {
    const user = await User.findById(req.user.id).populate('tokens').populate('ammo').populate('guns')

    res.send(user)
})

router.post('/auth/login', async (req, res) => {
    const {
        phone,
        password
    } = req.body;
    try {
        const user = await User.validateCredentials(phone, password)
        const token = await user.newAuthToken()

        res.send({
            user,
            token
        })
    } catch (error) {
        res.status(400).send({ error: 'Invalid credentials' })
    }
})

router.post('/auth/register', async (req, res) => {
    const {
        phone,
        password
    } = req.body;
    if (phone && password) {
        const _id = await User.generateId()
        const newUser = new User({
            _id,
            phone,
            password
        })
        const userExists = await User.findOne({ phone }) ? true : false;
        if (userExists) {
            res.status(400)
            return res.send(`User with phone number (${phone}) already exists`)
        }
        try {
            const token = await newUser.newAuthToken()

            res.cookie(API_COOKIE_NAME, token, { maxAge: API_MAX_AGE })
            res.send({
                newUser,
                token
            })
        } catch (err) {
            res.status(400)
            res.send(err.errors)
        }
    } else {
        res.status(400)
        res.send('Phone and password required')
    }
})

module.exports = router