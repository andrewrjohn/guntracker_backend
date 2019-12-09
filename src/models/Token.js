const mongoose = require('mongoose');
const { API_MAX_AGE } = require('../constants/api')
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    ownerId: String,
    token: {
        type: String,
        required: true
    },
    issuedAt: {
        type: Date,
        expires: new Date().getTime() + API_MAX_AGE,
        default: Date.now
    }

})

const Token = mongoose.model('Token', TokenSchema)

module.exports = Token;