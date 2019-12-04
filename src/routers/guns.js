const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Gun = require('../models/Gun')
const User = require('../models/User')
const Token = require('../models/Token')

router.get('/guns', auth, async (req, res) => {
    const guns = await Gun.find({
        ownerId: req.user.id
    })

    res.send(guns)
})

router.post('/guns', auth, async (req, res) => {
    const params = req.body
    params.ownerId = req.user.id
    const gun = new Gun(params)

    try {
        await gun.save()
        res.send(gun)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/guns/:gunId', auth, async (req, res) => {
    const gun = await Gun.findOne({
        _id: req.params.gunId
    })

    if (gun.ownerId !== req.user.id) {
        return res.sendStatus(401)
    }

    if (!gun) {
        return res.send(404)
    }

    try {
        await gun.updateOne({
            _id: req.params.gunId
        }, {
            $set: req.body
        })
        gun.save()
        res.send(gun)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router