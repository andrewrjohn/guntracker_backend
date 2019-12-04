const mongoose = require('mongoose');
const User = require('./User')
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
        expires: yearFromNow(),
        default: Date.now
    }

})

TokenSchema.methods.removeToken = async function (user) {
    const token = this

    // Remove token ref
    const updatedUser = await new User(user)
    updatedUser.tokens = updatedUser.tokens.filter((t) => t.token !== token.token)
    console.log(updatedUser)
    // await updatedUser.save()

    // // Remove actual token
    // await token.remove()

}

Token = mongoose.model('Token', TokenSchema)

module.exports = Token;