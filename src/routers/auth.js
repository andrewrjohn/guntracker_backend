const express = require('express');
const User = require('../models/User');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

router.post('/auth/forgotpassword', async (req, res) => {
    try {
        // By default if no credentials are provided when instantiating the Twilio client, the following environment variables are used: TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN
        const client = require('twilio')();
        const user = await User.findOne({ phone: req.body.phone });

        if (!user) {
            return res.status(404).send({ error: 'Phone number not found' });
        }
        
        // Since the secret is based off their current password, it will become invalid once they change it
        const temporarySecret = user.password + user.createdAt;

        const token = jwt.sign({ _id: user._id }, temporarySecret);

        const resetPWLink = `/resetpassword/${user._id}/${token}`;

        client.messages.create({
            body: `Follow this link to reset your password: ${resetPWLink}`,
            from: '+17346294377', // This is from Twilio, won't work without a valid account SID and auth token
            to: process.env.TEST_PHONE_NUMBER // Make sure you set this
        }).then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
        });
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Get the current authenticated user's account
router.get('/auth/profile', auth, async (req, res) => {
    const user = await User.findById(req.user._id).populate('ammo').populate('guns');
    res.send(user);
});

router.post('/auth/login', async (req, res) => {
    const { phone, password } = req.body;

    try {
        const user = await User.validateCredentials(phone, password);
        const token = await user.getAuthToken();
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