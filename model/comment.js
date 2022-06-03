const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema(
  
  {
    _id: {
      type: mongoose.Schema.ObjectId,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, '未正確代入回文作者'],
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
