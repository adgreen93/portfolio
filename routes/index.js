var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/angular', function(req, res) {
  res.sendfile('./views/index.html');
});

var db = require('../queries');

router.get('/api/puppies', db.getAllPuppies);

router.get('/api/puppies/:id', db.getSinglePuppy);
router.post('/api/puppies', db.createPuppy);
router.put('/api/puppies/:id', db.updatePuppy);
router.delete('/api/puppies/:id', db.removePuppy);

//angular routes here
router.get('/api/puppiesalt', db.getAllPuppiesAlt);

router.post('/api/puppiesalt', db.createPuppyAlt);

router.post('/charge', function(req, res, next){
  var stripe = require("stripe")("sk_test_0B6jqeCbWYS774x1h9hDVmuV");

// Token is created using Stripe.js or Checkout!
// Get the payment token submitted by the form:
var token = req.body.stripeToken; // Using Express
var chargeAmount = req.body.chargeAmount;
// so 1000 is ten dollars. so we need to add zeroes to the amount
console.log(chargeAmount);

// Charge the user's card:
var charge = stripe.charges.create({
  amount: chargeAmount,
  currency: "usd",
  description: "Example charge",
  source: token,
}, function(err, charge) {
  // asynchronously called
  res.send('success')
});
});



module.exports = router;
