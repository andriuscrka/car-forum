const mongoose = require('mongoose');

const Posts = require('../models/posts.model');
const PostPreviews = require('../models/post_previews.model');
const Threads = require('../models/threads.model');
const Comments = require('../models/comments.model');

exports.getPost = async (req, res) => {
  try{
    const post = await Posts.findById({'_id': req.params.postId});

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {    
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;
    const userId = req.query.userId;
    
    const posts = await Posts.find(userId ? {'user_id': userId} : {}).sort({ [sort]: order });

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPost = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const thread = await Threads.findById(req.body.thread_id);

    if(!thread) {
      return res.status(404).json({success: false, message: 'Thread not found'});
    }

    const post = req.body;

    const createPost =  await Posts.create([{...post, 'thread_title': thread.title}], { session: session });

    const postPreview = {'user_id': post.user_id, 'post_id': createPost[0]._id, 'thread_id': post.thread_id, 'thread_title': thread.title, 'author_name': post.author_name, 'title': post.title, 'text': post.text, 'likes': post.likes};

    const createPostPreview = await PostPreviews.create([postPreview], {session: session});

    const createComments = await Comments.create([{'post_id': createPost[0]._id}], {session: session});

    const updateThread = await Threads.findByIdAndUpdate(post.thread_id, {  $push: { 'posts': createPost[0]._id }  }, { new: true, runValidators: true, session: session });

    if(!createPost || !createPostPreview || !createComments || !updateThread) {
      return res.status(404).json({success: false, message: 'Post creation failed'});
    }

    await session.commitTransaction();

    res.status(201).json({success: true, message: 'Post uploaded successfully', data: createPost[0]});
  } catch (error) {
    await session.abortTransaction();

    res.status(500).json({success: false, message: error.message});
  } finally {
    await session.endSession();
  }
};

exports.editPost = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const postId = req.params.postId;
    const edit = req.body;

    const editedPost = await Posts.findByIdAndUpdate(postId, edit, { new: true, runValidators: true });

    await PostPreviews.findOneAndUpdate({'post_id': postId}, {'title': edit.title, 'text': edit.text}, {new: true, runValidators: true});

    await session.commitTransaction();

    res.status(200).json({ success: true, message: 'Post updated successfully', data: editedPost });
  } catch (error) {

    await session.abortTransaction();
    res.status(500).json({success: false, message: error.message});

  } finally {
    await session.endSession();
  }
};

exports.deletePost = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const postId = new mongoose.Types.ObjectId(req.params.postId);

    const post = await Posts.findByIdAndDelete(postId);

    await PostPreviews.findOneAndDelete({'post_id': postId});
    await Comments.deleteMany({'post_id': postId});
    await Threads.updateMany({'posts': postId}, { $pull: { 'posts': postId } });

    await session.commitTransaction();

    res.status(200).json({ success: true, message: 'Post deleted successfully', data: post });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ success: false, message: error.message });
  } finally {
    await session.endSession();
  }
};

exports.toggleLike = async (req, res) => {
  try {

    const postId = req.params.postId;
    const userId = req.body.user_id;

    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    res.status(200).json({ success: true, message: `Like ${likeIndex === -1 ? 'added' : 'removed'} successfully`, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
