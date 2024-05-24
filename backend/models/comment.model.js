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
},  {timestamps: true, _id: true});

commentSchema.plugin(uniqueValidator, { message: '"{VALUE}" is already in use.' });

module.exports = new mongoose.model('comment', commentSchema);