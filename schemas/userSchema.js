const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  phone: {
    type: Number,
    required: [true, 'Phone number is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  // guns: [
  //   {
  //     manufacturer: {
  //       type: String,
  //       required: [true, 'Gun manufacturer is required']
  //     },
  //     model: {
  //       type: String,
  //       required: [true, 'Gun model is required']
  //     },
  //     caliber: {
  //       required: [true, 'Gun caliber is required'],
  //       enum: ['22 LR', '.380 ACP', '9mm', '.40 S&W', '.45 ACP', '10mm', '5.7 FN', '.38 SPL', '.357 MAG', '5.56 / .223']
  //     },
  //     roundsFired: {
  //       type: Number,
  //       default: 0
  //     },
  //     lastUsed: Date,
  //   }
  // ],
  // ammo: [
  //   {
  //     manufacturer: {
  //       type: String,
  //       required: [true, 'Ammo manufacturer is required']
  //     },
  //     model: {
  //       type: String,
  //       required: [true, 'Ammo model is required']
  //     },
  //     caliber: {
  //       required: [true, 'Bullet caliber is required'],
  //       enum: ['22 LR', '.380 ACP', '9mm', '.40 S&W', '.45 ACP', '10mm', '5.7 FN', '.38 SPL', '.357 MAG', '5.56 / .223']
  //     },
  //     quantity: {
  //       type: Number,
  //       default: 0
  //     },
  //     roundsFired: {
  //       type: Number,
  //       default: 0
  //     },
  //     lastUsed: Date,
  //   }
  // ]
});

module.exports = userSchema;