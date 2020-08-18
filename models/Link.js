const {model, Schema, Types} = require('mongoose');


const schema = new Schema({
	from: {type: String, required: true},
	to: {type: String, required: true, unique: true},
	code: {type: String, required: true, unique: true},
	date: {type: Date, default: Date.now},
	visitions: [{date: {type: Date, default: Date.now}, ip: {type: String}}],
	owner: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model('Link', schema);
