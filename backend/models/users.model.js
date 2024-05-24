const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9]+$/.test(v);
      },
      message: 'Not a valid username'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: 'Not a valid email'
    }
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters'],
  }
},  {timestamps: true});

userSchema.plugin(uniqueValidator, { message: '"{VALUE}" is already in use.' });


const usersCollection = new mongoose.model('users', userSchema);

module.exports = usersCollection;   