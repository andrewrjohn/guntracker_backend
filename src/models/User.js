const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  phone: {
    type: Number,
    required: [true, 'Phone number is required'],
    unique: true,
    minlength: 10
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  guns: [{
    type: Schema.Types.ObjectId,
    ref: 'Gun'
  }],
  ammo: [{
    type: Schema.Types.ObjectId,
    ref: 'Ammo'
  }]
});

UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
    delete ret.tokens;
  }
});

UserSchema.set('toObject', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

UserSchema.methods.getAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id }, process.env.SECRET_KEY);
  return token;
};

UserSchema.statics.validateCredentials = async (phone, password) => {

  const user = await User.findOne({ phone });

  if (!user) {
    throw new Error();
  }
  const passwordMatches = await argon2.verify(user.password, password);

  if (!passwordMatches) {
    throw new Error();
  }

  return user;
};

UserSchema.statics.generateId = async () => {
  const allUsers = await User.find().sort({ _id: 'desc' });
  const id = allUsers[0] ? allUsers[0]._id + 1 : 1;
  return id;
};

UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await argon2.hash(user.password, { type: argon2.argon2id });
  }

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;