const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Text is required'],
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
},  {_id: true});

commentSchema.plugin(uniqueValidator, { message: '"{VALUE}" is already in use.' });

module.exports = commentSchema;