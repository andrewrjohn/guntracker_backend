const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GunSchema = new Schema({
    ownerId: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: [true, 'Gun manufacturer is required']
    },
    model: {
        type: String,
        required: [true, 'Gun model is required']
    },
    caliber: {
        type: String,
        required: [true, 'Gun caliber is required'],
    },
    roundsFired: {
        type: Number,
        default: 0
    },
    lastUsed: {
        type: Date,
        default: null
    },
    purchaseDate: {
        type: Date,
        default: null
    }
});

Gun = mongoose.model('Gun', GunSchema)

module.exports = Gun;