var express = require('express');
const {registerView, loginView,registerUser,loginUser,itemSearch,cartAdd,cartSearch } = require('../controllers/usersController.js');
const { protectRoute } = require("../auth/protect.js");
var router = express.Router();
/* GET home page. */

router.get('/', loginView);

router.get('/registration', registerView);

router.post('/register', registerUser);
router.post('/', loginUser);
router.get('/logout', (req, res) => {
  if (req.user) {
          console.log(req.user._id);

    req.session.destroy()
    res.clearCookie('connect.sid') // clean up!
  res.redirect('/');
  } else {
  res.redirect('/');
  }
})
// auth pages

router.get('/books',protectRoute, function(req, res, next) {
  res.render('books.ejs', { title: 'Anhar Market Place' });
});
router.get('/boxing',protectRoute, function(req, res, next) {
  res.render('boxing.ejs', { title: 'Anhar Market Place',id:req.user._id });
});
router.get('/cart', protectRoute,cartSearch);
router.post('/cartadd', protectRoute,cartAdd);
router.get('/galaxy', protectRoute,function(req, res, next) {
  res.render('galaxy.ejs', { title: 'Anhar Market Place',id:req.user._id });
});
router.get('/home', protectRoute,function(req, res, next) {
  res.render('home.ejs', { title: 'Anhar Market Place' });
});
router.get('/iphone',protectRoute, function(req, res, next) {
  res.render('iphone.ejs', { title: 'Anhar Market Place',id:req.user._id });
});
router.get('/leaves',protectRoute, function(req, res, next) {
  res.render('leaves.ejs', { title: 'Anhar Market Place',id:req.user._id });
});
router.get('/phones',protectRoute, function(req, res, next) {
  res.render('phones.ejs', { title: 'Anhar Market Place' });
});
router.get('/search',protectRoute, function(req, res, next) {
  res.render('searchresults.ejs', { title: 'Anhar Market Place' });
});
router.post('/search',protectRoute, itemSearch);

router.get('/sports', protectRoute,function(req, res, next) {
  res.render('sports.ejs', { title: 'Anhar Market Place' });
});
router.get('/sun', protectRoute,function(req, res, next) {
  res.render('sun.ejs', { title: 'Anhar Market Place' ,id:req.user._id});
});
router.get('/tennis', protectRoute,function(req, res, next) {
  res.render('tennis.ejs', { title: 'Anhar Market Place',id:req.user._id });
});
module.exports = router;
