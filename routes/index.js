var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Borrower = require('../models/borrower')
// Get Homepage
router.get('/', ensureAuthenticated, function (req, res) {

	if (req.user.usertype === "Admin") {
		User.find({ usertype: "Lender" }, (err, lenders) => {
			if (err) throw err;
			User.find({ usertype: "Borrower" }, (err, borrowers) => {
				if (err) throw err;
				res.render('index', {
					lenders,
					borrowers
				});
			})

		})

	}
	if (req.user.usertype === "Lender") {
		Borrower.find({}, (err, borrowers) => {
			if (err) throw err;
			res.render('lenderindex', {
				borrowers
			});
		})
	}

	if (req.user.usertype === "Borrower") {
		User.findById(req.user._id, (err, user) => {
			if (err) throw err;
			// res.render('borrowerindex', { user });
		// })
		Borrower.find({userid:req.user.id}, (err, borrowers) => {
			if (err) throw err;
			res.render('borrowerindex', { user,borrowers });
		})
	})
	}
	if (!req.user.usertype) {
		res.render('user');
	}
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/users/login');
	}
}

module.exports = router;