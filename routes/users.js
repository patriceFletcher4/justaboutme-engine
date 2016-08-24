var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var auth = require('../authentication.js');
var passport = require('passport');

router.get('/users', getAllUsers);
router.get('/users/:userId', getOneUser);
// router.post('/users', createUser);
router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.put('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);

module.exports = router;

function getAllUsers(req, res, next){
  User.find({}, function(err, users){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        users: users
      });
    }
  });
}
function getOneUser(req, res, next){
  User.find({_id: req.params.userId}, function(err, user){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        user: user
      });
    }
  });
}
function createUser(req, res, next){
  var user = new User(req.body);
  user.save(function(err, newUser){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        user: newUser
      });
    }
  });
}
function updateUser(req, res, next){
  User.findOneAndUpdate({_id: req.params.userId},
    req.body,
    function(err, oldUser){
      if (err){
        res.status(500).json({
          msg: err
        });
      } else {
        res.status(200).json({
          oldUser: oldUser
        });
      }
    });
}
function deleteUser(req, res, next){
  User.findOneAndRemove({_id: req.params.userId},
    function(err, deletedUser){
      if(err){
        res.status(500).json({
          msg: err
        });
      } else {
        res.status(200).json({
          deletedUser: deletedUser
        });
      }
    });
}
