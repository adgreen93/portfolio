var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/charge', function(req, res, next){
  var stripe = require("stripe")("sk_test_0B6jqeCbWYS774x1h9hDVmuV");

// Token is created using Stripe.js or Checkout!
// Get the payment token submitted by the form:
var token = req.body.stripeToken; // Using Express

// Charge the user's card:
var charge = stripe.charges.create({
  amount: 1000,
  currency: "usd",
  description: "Example charge",
  source: token,
}, function(err, charge) {
  // asynchronously called
  res.send('success')
});
})

module.exports = router;
