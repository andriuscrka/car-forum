const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const MIN_AGE = 16;

const birthdayValidator =function(birthday) {
  if (Object.prototype.toString.call(birthday) === '[object Date]') {
    if (isNaN(birthday.getTime())) {
      return false;
    } else { 
      const today = new Date();
      const birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= MIN_AGE;
    }
  } else {
    return false;
  }
};

const profileSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, 'User ID is required'],
    unique: true,
  },
  name: {
    type: String,
    minlength: [2, 'Name must be at least 2 characters'],
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  birthday: {
    type: Date,
    required: [true, 'Birthday is required'],
    validate: {
      validator: birthdayValidator,
      message: `User must be at least ${MIN_AGE} years old`
    },
  },
  cars: {
    type: Array,
    default: [],
  },

},  {timestamps: true});

profileSchema.plugin(uniqueValidator, { message: '"{VALUE}" is already in use.' });


const profilesCollection = new mongoose.model('profiles', profileSchema);

module.exports = profilesCollection;   