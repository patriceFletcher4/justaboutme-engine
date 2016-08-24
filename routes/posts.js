
var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var _ = require('lodash');

router.get('/posts', getAllPosts);
router.post('/posts', createPost);
router.get('/posts/:id', getPostById);
router.delete('/posts/:id', deletePost);
router.put('/posts/:id', updatePost);

module.exports = router;

function getAllPosts(req, res, next){
  Post.find({}, function(err, foundPosts){
    if(err){
      res.status(500).json({
        msg: err
      })
    } else {
      res.status(200).json({
        posts: foundPosts
      });
    }
  });
}
function createPost(req, res, next){
  var post = new Post({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    created: new Date(),
    updated: new Date()
  });
  post.save(function(err, newPost){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(201).json({
        post: newPost
      });
    }
  });
}
function getPostById(req, res, next){
  Post.findOne({_id: req.params.id}, function(err, foundPost){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        post: foundPost
      });
    }
  });
}
function deletePost(req, res, next){
  Post.findOneAndRemove({_id: req.params.id}, function(err, removedPost){
    if(err){
      res.status(500).json({
        msg: err
      })
    } else {
      res.status(200).json({
        removedPost: removedPost
      })
    }
  });
}
function updatePost(req, res, next){
  Post.findOneAndUpdate({_id: req.params.id},
    req.body,
    function(err, oldPost){
      if(err){
        res.status(500).json({
          msg: err
        });
      } else {
        res.status(200).json({
          oldPost: oldPost
        });
      }
    });
}
