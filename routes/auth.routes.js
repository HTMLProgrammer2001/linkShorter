const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const shortId = require('shortid');

const User = require('../models/User');
const Mail = require('../services/mail');


const authRouter = Router();

authRouter.post('/register', [
	check('email', 'Incorrect email').isEmail(),
	check('password', 'Minimum password length is 6 symbols').isLength({min: 6})
], async (request, response) => {
	try{
		const errors = validationResult(request);

		if(!errors.isEmpty())
			return response.status(422).json({
				errors: errors.array(),
				message: 'Incorrect data'
			});

		const {email, password} = request.body;
		const candidate = await User.findOne({email});

		if(candidate)
			return response.status(400).json({message: 'User with this email exists'});

		const salt = await bcrypt.genSalt(+process.env.SALT);
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = new User({email, password: hashedPassword, confirm: shortId.generate()});

		await user.save();

		const confirmLink = `localhost:3000/confirm/${user.confirm}`;

		await Mail.send({
			to: user.email,
			subject: 'Account confirmation',
			html: `Check link to confirm your account: <a href="${confirmLink}">Confirm</a>`
		});

		response.status(200).json({message: 'User created, check your email to activate'});
	}
	catch (e) {
		console.log(e);

		response.status(500).json({
			message: 'Something went wrong'
		});
	}
});

authRouter.post('/login', [
	check('email', 'Incorrect email').normalizeEmail().isEmail(),
	check('password', 'Enter password').exists()
], async (request, response) => {
	const errors = validationResult(request);

	if(!errors.isEmpty())
		return response.status(422).json({message: 'Incorrect data', errors: errors.array()});

	const {email, password} = request.body;
	const user = await User.findOne({email, confirm: null});

	if(!user)
		return response.status(404).json({message: 'This user are not registered or activated'});

	const isMatch = await bcrypt.compare(password, user.password);

	if(!isMatch)
		return response.status(422).json({message: 'Wrong password'});

	const token = jwt.sign({
		userID: user.id
	}, process.env.JWT_SECRET, {
		expiresIn: '1h'
	});

	return response.json({
		token,
		userID: user.id
	});
});

authRouter.get('/confirm/:code', async (request, response) => {
	const code = request.params.code;
	const user = await User.findOne({confirm: code});

	//not found this user
	if(!user || !code)
		return response.status(404).json({
			message: 'No found'
		});

	//verify user
	user.confirm = null;
	user.save();

	return response.status(200).json({
		message: 'Email confirmed'
	});
});


module.exports = authRouter;
