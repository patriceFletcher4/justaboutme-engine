var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updated: {
    type: Date,
    required: true
  }
});

postSchema.pre('findOneAndUpdate', function(){
  this.update({},{ $set: { updated: new Date() } });
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;
