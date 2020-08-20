const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t/', require('./routes/visitLink.routes'));

app.use(express.static('./client/build/'));

async function start(){
	try{
		await mongoose.connect(process.env.MONGO_URI, {
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
