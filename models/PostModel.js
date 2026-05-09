const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema( {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    user_id:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }
  },
  {
    collection: 'posts',
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
