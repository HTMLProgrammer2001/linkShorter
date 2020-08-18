const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const shortid = require('shortid');

const Link = require('../models/Link');
const authMiddleware = require('../middleware/auth.middleware');


const router = Router();

router.use(authMiddleware);

router.post('/generate', async (request, response) => {
	try{
		const {from} = request.body;

		let link = await Link.findOne({from});

		if(link)
			return response.json({link});

		const code = shortid.generate();
		const to = `/t/${code}`;

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
		response.json(links);
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
		response.json(link);
	}
	catch(e){
		response.status(500).json({
			message: 'Something went wrong'
		})
	}
});

module.exports = router;
