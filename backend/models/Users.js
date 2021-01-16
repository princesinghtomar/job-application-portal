const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	id: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	motive: {
		type: String,
		required: true
	},
	company: {
		type: String,
		required: false
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
