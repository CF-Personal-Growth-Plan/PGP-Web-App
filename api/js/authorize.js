/**
 * Created by dcorns on 10/4/14.
 */
'use strict';

var User = require('../../models/user');
var bcrypt = require('bcryptjs');

module.exports = function(usrObj) {
  return{
    echo: function(){
      return usrObj;
    },
    authenticate: function(test) {
      var usr = User.where({email: usrObj.email});
      usr.findOne(function (err, user) {
        if (err) console.log(err);
        var result = {user: false, password: false};
        if (user) {
          result.user = true;
          testPassword(user, result);
        }
        else{
          test(result);
        }
      });
      usr.findOne();
      function testPassword(usr, result) {
        bcrypt.compare(usrObj.password, usr.password, function(err, res) {
          result.password = res;
          console.log(result);
          test(result);
        });
      }
    },
    encrypt: function(cb){
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(usrObj.password, salt, function(err, hash) {
         usrObj.password = hash;
            cb(usrObj);
          });
        });
      }
  }
};