const {Router} = require('express');

const Link = require('../models/Link');

const router = Router();

router.get('/:code', async (request, response) => {
	const code = request.params.code;
	const link = await Link.findOne({code});

	//send not found error
	if(!link)
		return response.status(404);

	//add visit
	link.visitions.push({
		ip: request.ip,
		date: Date.now()
	});

	link.save();

	//redirect to target page
	return response.redirect(link.from);
});

module.exports = router;
