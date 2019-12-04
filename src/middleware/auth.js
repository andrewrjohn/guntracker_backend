const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findOne({
            _id: decoded._id,
        }).
        populate('tokens')


        if (!user || !user.tokens.filter((t) => t.token === token).length) {
            throw new Error()
        } else {
            req.token = token
            req.user = user
            next()
        }
    } catch (error) {
        res.status(401).send({
            error: 'Must be authenticated'
        })
    }
}

module.exports = auth