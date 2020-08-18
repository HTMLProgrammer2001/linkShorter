const {model, Schema, Types} = require('mongoose');


const schema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	links: [{
		type: Types.ObjectId,
		ref: 'Link'
	}]
});

module.exports = model('User', schema);
