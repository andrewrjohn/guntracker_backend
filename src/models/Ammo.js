const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const AmmoSchema = new Schema({
    ownerId: {
        type: String,
        required: true
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

}, { collection: 'ammo' });

// Add the reference from the user document 
AmmoSchema.post('save', async function () {
    const ammo = this;
    const owner = await User.findById(ammo.ownerId);

    owner.ammo.push(ammo.id);

    await owner.save();
});

// Remove the reference from the user document 
AmmoSchema.pre('remove', async function () {
    const ammo = this;
    const owner = await User.findById(ammo.ownerId);

   owner.ammo = owner.ammo.filter((a) => a.id !== ammo.id);
   await owner.save();
});

const Ammo = mongoose.model('Ammo', AmmoSchema);

module.exports = Ammo;