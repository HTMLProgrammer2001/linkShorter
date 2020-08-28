import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

require('dotenv').config();

import authRoutes from './routes/auth.routes';
import linkRoutes from './routes/link.routes';
import visitRoutes from './routes/visitLink.routes';


const app: express.Application = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/link', linkRoutes);
app.use('/t/', visitRoutes);

app.use(express.static('./client/build/'));

async function start(){
	const mongoURL: string = process.env.MONGO_URI || process.env.MONGO_LOCALE_URI;

	try{
		await mongoose.connect(mongoURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});

		app.listen(PORT, () => {
			console.log(`App started on port ${PORT}`);
		});
	}
	catch (e) {
		console.log(`Server error ${e.message}`);
		process.exit(1);
	}
};

start();
