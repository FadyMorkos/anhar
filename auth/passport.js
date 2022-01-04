/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//js
const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;
//Load model
const User = require("../models/users.js");
const loginCheck = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
      //Check customer
      User.findOne({ username: username })
        .then((user) => {
          if (!user) {
            console.log("wrong username");
            return done();
          }
          //Match Password
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              return done(null, user);
            } else {
              console.log("Wrong password");
              return done();
            }
          });
        })
        .catch((error) => console.log(error));
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });
};
module.exports = {
  loginCheck,
};