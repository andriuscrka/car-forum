const mongoose = require('mongoose');

const Comments = require('../models/comments.model');
const UserComments = require('../models/user_comments.model');
const Posts = require('../models/posts.model');
const CommentSchema = require('../models/comment.model'); 
const Comment = mongoose.model('Comment', CommentSchema);

exports.addComment = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const postId = req.params.postId;
    let commentCollection = await Comments.findOne({'post_id': postId});

    const userId = req.body.user_id;

    const newComment = new Comment({'text': req.body.text});
    const commentErr = newComment.validateSync();

    if(commentErr) {
      return res.status(400).json({success: false, message: 'Comment validation failed', error: commentErr});
    }

    const userCommentsIndex = commentCollection.users.findIndex(user => user?.user_id === userId);

    if(userCommentsIndex !== -1) {
      commentCollection.users[userCommentsIndex].comments.push(newComment.toObject());
      commentCollection.markModified('users');
    } else {
      const newComments = new UserComments({
        'user_id': userId,
        author_name: req.body.author_name,
        comments: [newComment.toObject()],
      });

      const commentsErr = newComments.validateSync();
      if(commentsErr) {
        console.log(commentsErr);
        return res.status(400).json({success: false,  message: 'Comments validation failed', error: commentsErr});
      }
      
      commentCollection.users.push(newComments.toObject());
    }

    await commentCollection.save();

    await Posts.findOneAndUpdate(
      { _id: postId },
      { updatedAt: new Date() },
      { new: true, session }
    );

    await session.commitTransaction();

    res.status(201).json({success: true, message: 'Comment added successfully', data: newComment});

  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({success: false, message: error.message});
  } finally {
    await session.endSession();
  }
};

exports.editComment = async (req, res) => {
  try{
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const userId = req.body.user_id;
    const newText = req.body.comment;

    const comments = await Comments.findOne({'post_id': postId});
    const userIndex = comments.users.findIndex(user => user.user_id === userId);
    if (userIndex === -1) {
      return res.status(404).json({success: false, message: 'User not found in comment collection'});
    }

    const userComments = comments.users[userIndex];
    const commentIndex = userComments.comments.findIndex(comment => comment._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({success: false, message: 'Comment not found'});
    }

    comments.users[userIndex].comments[commentIndex].text = {text: newText, updatedAt: new Date()};
    comments.markModified(`users.${userIndex}.comments`);

    await comments.save();

    res.status(200).json({success: true, message: 'Comment updated successfully', data: newText});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

exports.deleteComment = async (req, res) =>  {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const userId = req.body.user_id;

    const comments = await Comments.findOne({'post_id': postId});
    const userIndex = comments.users.findIndex(user => user.user_id === userId);
    if (userIndex === -1) {
      return res.status(404).json({success: false, message: 'User not found in comment collection'});
    }

    const userComments = comments.users[userIndex];
    const commentIndex = userComments.comments.findIndex(comment => comment._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({success: false, message: 'Comment not found'});
    }

    comments.users[userIndex].comments.splice(commentIndex, 1);
    comments.markModified(`users.${userIndex}.comments`);

    await comments.save();
    res.status(200).json({success: true, message: 'Comment deleted successfully', data: comments.users[userIndex].comments});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

exports.getComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comments.findOne({'post_id': postId});

    res.status(200).json({success: true, data: comments || []});

  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};