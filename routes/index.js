var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

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

// this is the smart checkout that we'll be working on
stripe.customers.create({
  email: "paying.user@example.com",
  source: token,
}).then(function(customer) {
  // YOUR CODE: Save the customer ID and other info in a database for later.
  return stripe.charges.create({
    amount: 1000,
    currency: "usd",
    description: "Example charge",
    customer: customer.id,
  });
}).then(function(charge) {
  // Use and save the charge info.
    res.send('success')
});

module.exports = router;
