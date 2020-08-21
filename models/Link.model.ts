import {model, Schema, Types, Document} from 'mongoose';


export interface ILinkModel extends Document{
	from: string,
	to: string,
	code: string,
	date: Date,
	owner: Types.ObjectId,
	visitions: Array<{date: number, ip: string}>
}

const schema = new Schema({
	from: {type: String, required: true},
	to: {type: String, required: true, unique: true},
	code: {type: String, required: true, unique: true},
	date: {type: Date, default: Date.now},
	visitions: [{date: {type: Date, default: Date.now}, ip: {type: String}}],
	owner: {type: Types.ObjectId, ref: 'User'}
});

export default model<ILinkModel>('Link', schema);
