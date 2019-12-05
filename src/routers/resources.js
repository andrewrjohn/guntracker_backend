const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const resourceOwner = require('../middleware/resourceOwner')
const Gun = require('../models/Gun')
const Ammo = require('../models/Ammo')

const route = '/:type(guns|ammo)'

const ResourceModel = (req) => req.originalUrl.includes("guns") ? Gun : Ammo

router.get(route, auth, async (req, res) => {
    const Resource = ResourceModel(req)
    const resources = await Resource.find({
        ownerId: req.user.id
    })

    res.send(resources)
})

router.post(route, auth, async (req, res) => {
    const params = Object.assign(req.body, {
        ownerId: req.user.id
    })
    const Resource = ResourceModel(req)
    const resource = new Resource(params)

    try {
        await resource.save()
        res.send(resource)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get(`${route}/:id`, [auth, resourceOwner], async (req, res) => {
    const Resource = ResourceModel(req)
    res.send(await Resource.findOne({
        _id: req.params.id
    }))
})

router.post(`${route}/:id`, [auth, resourceOwner], async (req, res) => {
    const Resource = ResourceModel(req)
    let resource = await Resource.findOne({
        _id: req.params.id
    })

    try {
        resource = Object.assign(resource, req.body)
        res.send(await resource.save())
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router