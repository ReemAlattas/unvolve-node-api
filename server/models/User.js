import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [4, 'Username must be 4 characters or more!'],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be 8 characters or more!'],
  },
  createdAt: {type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false},
});

//Password Encryption

const User = mongoose.model('User', userSchema);
export default User;
