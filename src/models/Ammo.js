const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmmoSchema = new Schema({
    ownerId: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: [true, 'Ammo manufacturer is required']
    },
    model: {
        type: String,
        required: [true, 'Ammo model is required']
    },
    caliber: {
        type: String,
        required: [true, 'Bullet caliber is required'],
    },
    quantity: {
        type: Number,
        default: 0
    },
    roundsFired: {
        type: Number,
        default: 0
    },
    lastUsed: Date,

});

Ammo = mongoose.model('Ammo', AmmoSchema)

module.exports = Ammo;