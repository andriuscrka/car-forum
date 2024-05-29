const mongoose = require('mongoose');

const Posts = require('../models/posts.model');
const PostPreviews = require('../models/post_previews.model');
const Threads = require('../models/threads.model');

exports.getThread = async (req, res) => {
  try{
    const thread = await Threads.findById(req.params.threadId);

    if (!thread) {
      return res.status(404).json({ success: false, message: 'Thread not found' });
    }

    res.status(200).json({ success: true, data: thread });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getThreads = async (req, res) => {
  try {
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;

    const threads = await Threads.find().sort({ [sort]: order });
    res.status(200).json({ success: true, data: threads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createThread = async (req, res) => {
  try {
    const threadData = req.body;

    const thread = new Threads(threadData);

    await thread.save();

    res.status(201).json({ success: true, data: thread });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.editThread = async (req, res) => {
  const session = await mongoose.startSession();
  try{
    session.startTransaction();
    
    const threadId = req.params.threadId;
    const {title, description} = req.body;

    const thread = await Threads.findOneAndUpdate(
      {'_id': req.params.threadId},
      {title, description },
      { new: true, runValidators: true, session: session }
    );

    if (!thread) {
      throw new Error('Thread does not exist!');
    }

    if(title) {
      await Posts.updateMany(
        { 'thread_id': threadId },
        { 'thread_title': title },
        { session: session }
      );

      await PostPreviews.updateMany(
        { 'thread_id': threadId },
        { 'thread_title': title },
        { session: session }
      );
    }

    await session.commitTransaction();

    res.status(200).json({ success: true, data: thread });
  } catch (error) {
    await session.abortTransaction();

    res.status(500).json({ success: false, message: error.message });
  }
  finally {
    await session.endSession();
  }
};

module.exports = exports;