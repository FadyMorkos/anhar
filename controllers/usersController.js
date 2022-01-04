//js
const User = require("../models/users.js");
const Item = require("../models/item.js");
const Cart = require("../models/cart.js");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const util = require('util');
//For Register Page
const registerView = (req, res) => {
  res.render('registration.ejs', { title: 'Anhar Market Place' });
}
// For View 
const loginView = (req, res) => {

  res.render('login.ejs', { title: 'Anhar Market Place' });

}

const registerUser = (req, res) => {
  const { username, password } = req.body;
  if (!username  || !password ) {
    console.log("Fill empty fields");
  }
 else {
    //Validation
    User.findOne({ username: username }).then((user) => {
      if (user) {
        console.log("username exists");
        mss= "username exists";
        res.render("registration.ejs", {
          username,
          password,
          mss,
        });
      } else {
        //Validation
        const newUser = new User({
          username,
          password,
        });
        //Password Hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(res.redirect("/"))
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
}
const loginUser = (req, res) => {
  const { username, password } = req.body;
  //Required
  if (!username || !password) {
    console.log("Please fill in all the fields");
    res.render("/", {
      username,
      password,
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "/home",
      failureRedirect: "/",
      failureFlash: true,
    })(req, res);
  }
};
const itemSearch = (req, res) => {
  const {Search} = req.body;
  if (!Search) {
    console.log("Fill empty fields");
  }
 else {
    //Validation
    
    Item.find({ name: Search }).then((item) => {
      if (item.length) {
        console.log("Item exists");
        console.log(util.inspect(item,{depth: null}));
                mss='Item exists';

        res.render("searchresults.ejs", 
        {item},
        );
      } else {
        //Validation
        mss='item not found';
            console.log(Search);

res.render("searchresultsn.ejs", 
{mss},
        );
      }
    });
  }
};
const cartSearch = (req, res) => {

    //Validation
    
    Cart.find({ uid: req.user._id }).then((cart) => {
      if (cart.length) {
        console.log("Item exists");
        console.log(util.inspect(cart,{depth: null}));
        res.render("cart.ejs", 
        {cart},
        );
      } else {
        //Validation
        mss='cart empty';
        console.log(mss);

res.render("cart.ejs", 
{ mss},
        );
      }
    });
};

const cartAdd = (req, res) => {
  const {iid ,uid,iname} = req.body;
  if (!uid || !iid ) {
      
    console.log(req.user._id);
    console.log(iid);
    console.log("Fill empty fields");
  }
 else {
    //Validation
    Cart.find({ uid: uid ,iid: iid}).then((cart) => {
      if (cart.length) {
        console.log("cart exists");
        mss= "cart exists";
        nqty= parseInt(cart[0].qty)+1;
        Cart.updateOne({ uid: uid ,iid: iid},{$set: {qty:nqty }}, function(err) {
    if (err) throw err;
    console.log("1 document updated");

            
    res.redirect('/home')
        });

      } else {
        //Validation
        qty = 1;
       const newCart = new Cart({uid,iid,iname,qty});
        //Password Hashing

            newCart.save().then(res.redirect("/home")) .catch((err) => console.log(err));

      }
    });
  }
}
module.exports =  {
    registerView,
    loginView,
    registerUser,
    loginUser,
    itemSearch,
    cartAdd,
    cartSearch
};