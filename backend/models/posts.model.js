const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const postSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, 'User ID is required'],
    immutable: true,
  },
  thread_id: {
    type: String,
    required: [true, 'Thread ID is required'],
  },
  thread_title:{
    type: String,
    required: [true, 'Thread name is required'],
  },
  author_name: {
    type: String,
    required: [true, 'Author name is required'],
  },
  title:{
    type: String,
    required: [true, 'Title is required'],
    minlength: [2, 'Title must be at least 2 characters'],
  },
  text: {
    type: String,
    required: [true, 'Text is required'],
    minlength: [10, 'Text must be at least 10 characters'],
  },
  likes: {
    type: Array,
    default: [],
  }
},  {timestamps: true});

postSchema.plugin(uniqueValidator, { message: '"{VALUE}" is already in use.' });


const postsCollection = new mongoose.model('posts', postSchema);

module.exports = postsCollection;   