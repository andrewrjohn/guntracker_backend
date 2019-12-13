const express = require('express');
const User = require('../models/User');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/auth/profile', auth, async (req, res) => {
    const user = await User.findById(req.user._id).populate('ammo').populate('guns');
    res.send(user);
});

router.post('/auth/login', async (req, res) => {
    const { phone, password } = req.body;

    try {
        const user = await User.validateCredentials(phone, password);
        const token = await user.getAuthToken();
        await user.save();
        res.header('auth', token).send(user);
    } catch (error) {
        res.status(400).send({ error: 'Invalid credentials' });
    }
});

router.post('/auth/register', async (req, res) => {
    const { phone, password } = req.body;

    if (phone && password) {
        const _id = await User.generateId();
        const newUser = new User({ _id, phone, password });
        const userExists = await User.findOne({ phone });
        if (userExists) {
            return res.status(400).send('Phone number already exists');
        }
        try {
            const token = await newUser.getAuthToken();

            // res.cookie(API_COOKIE_NAME, token, { maxAge: API_MAX_AGE });
            await newUser.save();
            res.header('auth', token).send(newUser);
        } catch (err) {
            res.status(400).send(err.errors);
        }
    } else {
        res.status(400);
        res.status(400).send('Phone and password required');
    }
});

module.exports = router;