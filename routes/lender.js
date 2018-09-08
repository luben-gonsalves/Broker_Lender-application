var express = require('express');
var router = express.Router();
var Borrower = require('../models/borrower');

router.get('/accept/:id',ensureAuthenticated,(req,res)=>{
    var id = req.params.id;
  Borrower.findByIdAndUpdate(id,{$set:{status : true}},{new : true},(err,user)=>{
       if(err) throw err;
       console.log("Accepted");
       req.flash('success_msg','You accepted the request');
       res.redirect('/');
  })
})
router.get('/reject/:id',ensureAuthenticated,(req,res)=>{
     var id=req.params.id;
     Borrower.findByIdAndUpdate(id,{$set:{reject : true}},{new : true},(err,user)=>{
      if(err) throw err;
      req.flash('success_msg','You rejected the request');
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