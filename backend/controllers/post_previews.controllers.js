const mongoose = require('mongoose');

const Posts = require('../models/posts.model');
const PostPreviews = require('../models/post_previews.model');
const Threads = require('../models/threads.model');

exports.getPostPreview = async (req, res) => {
  try{
    const postPreview = await PostPreviews.find({'post_id': req.params.postId});

    if (!postPreview) {
      return res.status(404).json({ success: false, message: 'Post preview not found' });
    }

    res.status(200).json({ success: true, data: postPreview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPostPreviewsByThread = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;
    const threadId = req.params.threadId;

    const postPreviews = await PostPreviews.find({'thread_id': threadId}).sort({ [sort]: order }).session(session);      
    const thread = await Threads.findById(threadId).session(session);


    if (!postPreviews) {
      return res.status(404).json({ success: false, message: 'No post previews found' });
    }

    await session.commitTransaction();

    res.status(200).json({ success: true, data:  {previews: postPreviews, thread_title: thread.title}});
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ success: false, message: error.message });
  } finally {
    await session.endSession();
  }
};


exports.getPostPreviews = async (req, res) => {
  try {    
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;
    const userId = req.query.userId;

    const postPreviews = await PostPreviews.find(userId ? {'user_id': userId} : {}).sort({ [sort]: order });

    if (!postPreviews) {
      return res.status(404).json({ success: false, message: 'No post previews found' });
    }

    res.status(200).json({ success: true, data: postPreviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};