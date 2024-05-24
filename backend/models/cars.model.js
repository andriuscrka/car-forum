const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const carSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [5, 'Description must be at least 5 characters'],
  },
},  {_id: true});

carSchema.plugin(uniqueValidator, { message: '"{VALUE}" is already in use.' });

module.exports = new mongoose.model('cars', carSchema);