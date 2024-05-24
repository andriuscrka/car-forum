const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'Title is required'],
    minlength: [2, 'Title must be at least 2 characters'],
  },
  description: {
    type: String,
    default: undefined,
  },
  posts: {
    type: Array,
    default: [],
  },
},  {timestamps: true});

threadSchema.plugin(uniqueValidator, { message: '"{VALUE}" is already in use.' });


const threadsCollection = new mongoose.model('threads', threadSchema);

module.exports = threadsCollection;   