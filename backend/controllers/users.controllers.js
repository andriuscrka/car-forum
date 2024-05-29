const mongoose = require('mongoose');

const Users = require('../models/users.model');
const Profiles = require('../models/profiles.model');

exports.login = async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await Users.findOne({username});

    if(!user || user.password !== password) {
      return res.status(404).json({success: false, message: 'Username or password is incorrect'});
    }
    
    const { password: _, ...userWithoutPassword } = user.toObject();
        
    res.status(200).json({success: true, message: 'Login successful', data: userWithoutPassword});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

exports.register = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = req.body;

    const account = {username: user.username, password: user.password, email: user.email, name: user.name};
    const createAccount =  await Users.create([account], { session: session });

    const profile = {user_id: createAccount[0]._id.toString(), username: user.username, name: user.name, birthday: user.birthday};
    const createProfile = await Profiles.create([profile], {session: session});

    if(!createAccount || !createProfile) {
      return res.status(404).json({success: false, message: 'Registration failed'});
    }

    await session.commitTransaction();

    res.status(201).json({success: true, message: 'Registration successful', data: createAccount[0]._id});
  } catch (error) {
    await session.abortTransaction();

    res.status(500).json({success: false, message: error.message});
  } finally {
    await session.endSession();
  }
};

// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await Users.findByIdAndDelete(req.params.userId);

//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     res.status(200).json({ success: true, message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

exports.updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await Users.findByIdAndUpdate(
      req.params.userId,
      { password },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;

    const users = await Users.find().sort({ [sort]: order });
    
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try{
    const user = await Users.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = exports;