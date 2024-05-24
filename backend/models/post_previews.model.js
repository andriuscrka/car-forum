const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const postPreviewSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, 'User ID is required'],
    immutable: true,
  },
  post_id: {
    type: String,
    required: [true, 'Post ID is required'],
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
    default: undefined,
  },
  likes: {
    type: Array,
    default: [],
  }
},  {timestamps: true});

postPreviewSchema.plugin(uniqueValidator, { message: '"{VALUE}" is already in use.' });


const postPreviewsCollection = new mongoose.model('post_previews', postPreviewSchema);

module.exports = postPreviewsCollection;   