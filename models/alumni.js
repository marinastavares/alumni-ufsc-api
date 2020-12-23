var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema(  {
	full_name: {
		type: String,
		required: true,
		trim: true,
	},
	start_by: {
		type: String,
		trim: true,
	},
	end_by: {
		type: String,
		trim: true,
	},
	linkedin: {
		type: String,
		trim: true,
	},
	country: {
		type: String,
		trim: true,
	},
	position: {
		type: String,
		trim: true,
	},
	company: {
		type: String,
		trim: true,
	},
	ufsc: {
		type: String,
		trim: true,
	},
});

module.exports = mongoose.model('alumni-teste', BookSchema);
