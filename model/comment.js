const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
    },
    article_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    body: {
      type: String,
      required: [true, '沒有回覆內容'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'comments',
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;