
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('./models/user.js');

module.exports = {
  signup: signup,
  login: login
};

function signup(req, res){
    var user = new User(req.body);

    user.setPassword(req.body.password);
    user.save(function(err){
      if(err){
        return res.status(500).json({
          msg: 'error!'
        })
      }
      var token = user.generateJwt();
      return res.status(200).json({
        token: token,
        msg: 'success'
      })
    });
}
function login(req, res){
  console.log('before auth');
  passport.authenticate('local', function(err, user, info){
    console.log('inside auth');
    if(err){
      return res.status(500).json({
        msg: 'authentication failed'
      })
    }
    if(user){
      var token = user.generateJwt();
      return res.status(200).json({
        msg: 'authentication succeeded',
        token: token
      })
    } else {
      return res.status(401).json(info);
    }

  })(req, res);
  console.log('after auth');

}
