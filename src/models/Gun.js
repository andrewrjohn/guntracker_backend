const mongoose = require('mongoose');
const User = require('./User');
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

// Add the reference from the user document 
GunSchema.post('save', async function () {
    const gun = this;
    const owner = await User.findById(gun.ownerId);
    
    owner.guns.push(gun.id);
    
    await owner.save();
} );

// Remove the reference from the user document 
GunSchema.pre('remove', async function () {
    const gun = this;
    const owner = await User.findById(gun.ownerId);

   owner.gun = owner.gun.filter((a) => a.id !== gun.id);
   await owner.save();
});

const Gun = mongoose.model('Gun', GunSchema);

module.exports = Gun;