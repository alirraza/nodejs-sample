import bcrypt from 'bcrypt';
import { Schema, model, Types } from 'mongoose';

const { SALT_ROUNDS } = process.env;

const schema = new Schema({
  userId: { type: Types.ObjectId },
  name: { type: String },
  email: {
    type: String,
    unique: true,
    required: 'Email Address is required'
  },
  password: { type: String },
  token: { type: String }
}, {
  timestamps: true
});

schema.pre('save', async function SavePassword(next) {
  try {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    const hashSalt = parseInt(SALT_ROUNDS, 10) || 10;
    const hashedPassword = await bcrypt.hash(user.password, hashSalt);
    this.password = hashedPassword;

    return next();
  } catch (error) {
    const err = new Error();
    err.errorMessage = 'Error while encrypting';
    throw err;
  }
});

schema.methods.ValidatePassword = function (candidatePassword) {
  try {
    return bcrypt.compareSync(candidatePassword, this.password);
  } catch (error) {
    const err = new Error();
    err.errorMessage = 'Error In Password Validation';

    throw err;
  }
};

const User = model('user', schema, 'users');

export default User;
