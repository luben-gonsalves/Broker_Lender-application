var express = require('express');
var router = express.Router();
var Borrower = require('../models/borrower');

router.post('/loan/:id',ensureAuthenticated, function (req, res) {
  var userid = req.params.id;
  var amount = req.body.amount
	var accountNumber = req.body.accountNumber;
  var periodStart = req.body.periodStart;
  var periodEnd=req.body.periodEnd

  var newBorrower = new Borrower({
    amount: amount,
    accountNumber: accountNumber,
    periodStart: periodStart,
    periodEnd: periodEnd,
    userid : userid
  })
  newBorrower.save((err)=>{
     if(err) throw err;
     req.flash('success_msg','Your loan request has been sent');
     res.redirect('/');
   })
  })
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/users/login');
    }
  }

  module.exports = router;