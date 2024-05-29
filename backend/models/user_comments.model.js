const mongoose = require('mongoose');
const commentSchema = require('./comment.model');
const uniqueValidator = require('mongoose-unique-validator');

const userCommentsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, 'User ID is required'],
    immutable: true,
  },
  author_name: {
    type: String,
    required: [true, 'Author name is required'],
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
},  {timestamps: true});

userCommentsSchema.plugin(uniqueValidator, { message: '"{VALUE}" is already in use.' });

module.exports = new mongoose.model('user-comments', userCommentsSchema);