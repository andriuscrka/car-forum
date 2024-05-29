const mongoose = require('mongoose');

const Users = require('../models/users.model');
const Profiles = require('../models/profiles.model');
const Posts = require('../models/posts.model');
const PostPreviews = require('../models/post_previews.model');
const Cars = require('../models/cars.model');
const Comments = require('../models/comments.model');

exports.getProfile = async (req, res) => {
  try{
    const profile = await Profiles.findOne({user_id: req.params.userId});

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.editProfile = async (req, res) => {
  const session = await mongoose.startSession();
  try{
    session.startTransaction();
    
    let updatedProfile =  req.body;

    if(req.body.name) {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { name: updatedProfile.name },
        { new: true, runValidators: true, session: session }
      );

      if (!user) {
        throw new Error('User does not exist!');
      }

      await Posts.updateMany(
        { 'user_id': req.params.userId },
        { 'author_name': updatedProfile.name },
        { session: session }
      );

      await PostPreviews.updateMany(
        { 'user_id': req.params.userId },
        { 'author_name': updatedProfile.name },
        { session: session }
      );

      await Comments.updateMany( 
        {},
        { $set: { 'users.$[user].author_name' : updatedProfile.name } },
        { 
          arrayFilters: [ { 'user.user_id': req.params.userId } ],
          session: session 
        });
    }

    if(req.body.cars) {
      const carDocs = req.body.cars.map(car => new Cars(car));
      carDocs.forEach(carDoc => carDoc.validateSync());
      const carObjs = carDocs.map(carDoc => carDoc.toObject());

      updatedProfile = { ...updatedProfile, cars: carObjs };
    }

    const profile = await Profiles.findOneAndUpdate({user_id: req.params.userId}, updatedProfile, {new: true, runValidators: true,  session: session });

    if (!profile) {
      throw new Error('Profile does not exist!');
    }

    await session.commitTransaction();

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    await session.abortTransaction();

    res.status(500).json({ success: false, message: error.message });
  }
  finally {
    await session.endSession();
  }
};


module.exports = exports;