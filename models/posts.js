const mongoose = require('mongoose')

const postSchma = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

})

const Post = mongoose.model('Post',postSchma)
module.exports = Post