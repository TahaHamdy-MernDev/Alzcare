const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: Object,
    default: {
      url: "",
      publicId: null
    }
  },
  text: {
    type: String,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, {
  timestamps: true,
});

const postSchema = new Schema({

  text: {
    type: String,
  },
  image: {
    type: Object,
    default: {
      url: "",
      publicId: null,
    },
  },
  user: {
    type: String,
    required: true,
    ref: 'User'
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, {
  timestamps: true,
});


postSchema.pre('find', function (next) {
  this.populate('user')
  next();
});
postSchema.pre('findOne', function (next) {
  this.populate('user')
  next();
});
commentSchema.pre('find', function (next) {
  this.populate('user')
  next();
});
const CommentModel = model("Comment", commentSchema);
const PostModel = model("Post", postSchema);
module.exports = {
  CommentModel, PostModel
}
