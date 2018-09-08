var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/accept/:id',ensureAuthenticated,(req,res)=>{
    var id = req.params.id;
  User.findByIdAndUpdate(id,{$set:{status : true}},{new : true},(err,user)=>{
       if(err) throw err;
       req.flash('success_msg','You accepted the request');
       res.redirect('/');
  })
})
router.get('/reject/:id',ensureAuthenticated,(req,res)=>{
     var id=req.params.id;
     User.findByIdAndUpdate(id,{$set:{reject : true}},{new : true},(err,user)=>{
      if(err) throw err;
      req.flash('success_msg','You rejected the request');
      res.redirect('/');
 })
})

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;