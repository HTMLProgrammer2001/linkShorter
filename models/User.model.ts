import {model, Document, Schema} from 'mongoose';


export interface IUserModel extends Document{
	email: string,
	password: string,
	confirm: string | null
}

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
	confirm: String
});

export default model<IUserModel>('User', schema);
