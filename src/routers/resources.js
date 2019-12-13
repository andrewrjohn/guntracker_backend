const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const resourceOwner = require('../middleware/resourceOwner');
const Gun = require('../models/Gun');
const Ammo = require('../models/Ammo');

const route = '/:type(guns|ammo)';

const ResourceModel = (req) => req.originalUrl.includes('guns') ? Gun : Ammo;

// Get all guns/ammo
router.get(route, auth, async (req, res) => {
    const Resource = ResourceModel(req);
    const resources = await Resource.find({ ownerId: req.user._id });

    res.send(resources);
});

// Add gun/ammo
router.post(route, auth, async (req, res) => {
    const params = Object.assign(req.body, { ownerId: req.user._id });
    const Resource = ResourceModel(req);
    const resource = new Resource(params);

    try {
        res.send(await resource.save());
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get specific gun/ammo
router.get(`${route}/:id`, [auth, resourceOwner], async (req, res) => {
    const Resource = ResourceModel(req);
    res.send(await Resource.findOne({ _id: req.params.id }));
});

// Update specific gun/ammo
router.post(`${route}/:id`, [auth, resourceOwner], async (req, res) => {
    const Resource = ResourceModel(req);
    let resource = await Resource.findOne({ _id: req.params.id });

    try {
        resource = Object.assign(resource, req.body);
        res.send(await resource.save());
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete specific gun/ammo
router.delete(`${route}/:id`, [auth, resourceOwner], async (req, res) => {
    const Resource = ResourceModel(req);

    try {
        await Resource.remove({ _id: req.params.id });
        res.sendStatus(200);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;