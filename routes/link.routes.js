const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const shortid = require('shortid');

const Link = require('../models/Link');
const authMiddleware = require('../middleware/auth.middleware');


const router = Router();

router.use(authMiddleware);

router.post('/generate', [check('url', 'Invalid URL').isURL()], async (request, response) => {
	try{
		const errors = validationResult(request);

		if(!errors.isEmpty())
			return response.status(422).json({message: 'Incorrect data', errors: errors.array()});

		const {url: from} = request.body;

		let link = await Link.findOne({from});

		if(link)
			return response.json({link});

		const code = shortid.generate();
		const to = `${process.env.URI}/t/${code}`;

		link = new Link({owner: request.user.userID, from, to, code});
		await link.save();

		return response.json({link});
	}
	catch(e){
		response.status(500).json({
			message: 'Something went wrong'
		})
	}
});

router.get('/', async (request, response) => {
	try{
		const links = await Link.find({owner: request.user.userID});
		response.json({links});
	}
	catch(e){
		response.status(500).json({
			message: 'Something went wrong'
		})
	}
});

router.get('/:id', async (request, response) => {
	try{
		const link = await Link.findOne({_id: request.params.id, owner: request.user.userID});

		if(!link)
			return response.status(404).json({
				message: 'Not found link with this id'
			});

		response.json({link});
	}
	catch(e){
		response.status(500).json({
			message: 'Something went wrong'
		})
	}
});

router.delete('/:id', async (request, response) => {
	try{
		const link = await Link.findOne({_id: request.params.id, owner: request.user.userID});

		if(!link)
			return response.status(404).json({
				message: 'Not found link with this id'
			});

		await Link.remove({_id: request.params.id});

		return response.status(200).json({
			message: 'Link deleted successfully'
		});
	}
	catch(e){
		response.status(500).json({
			message: 'Something went wrong'
		});
	}
});

module.exports = router;
