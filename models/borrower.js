var mongoose = require('mongoose');

// User Schema
var BorrowerSchema = mongoose.Schema({
	amount:{
		type:String
	},
	accountNumber:{
		type: String
	},
	periodStart:{
		type: Date
	},
	periodEnd:{
		type: Date
	},
	status : {
		type : Boolean,
		default  : false
	},
	reject : {
		type : Boolean,
		default  : false
	},
	userid : {
		type : String
	}
});

var Borrower = module.exports = mongoose.model('Borrower',BorrowerSchema);
