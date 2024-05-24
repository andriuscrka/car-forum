const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const commentsSchema = new mongoose.Schema({
  post_id: {
    type: String,
    required: [true, 'Post ID is required'],
    immutable: true,
  },
  users: {
    type: Array,
    default: [],
  },
},  {timestamps: true, _id: true});

commentsSchema.plugin(uniqueValidator, { message: '"{VALUE}" is already in use.' });

const commentsCollection = mongoose.model('comments', commentsSchema);

module.exports = commentsCollection;   