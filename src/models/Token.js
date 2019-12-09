const mongoose = require('mongoose');
const User = require('./User')
const {
    API_MAX_AGE
} = require("../constants/api")
const Schema = mongoose.Schema;


function yearFromNow() {
    const time = new Date();
    time.setTime(time.getTime() + 120000)
    return time
}

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

Token = mongoose.model('Token', TokenSchema)

module.exports = Token;