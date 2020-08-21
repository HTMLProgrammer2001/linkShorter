import {Router, Response, Request} from 'express';

import Link, {ILinkModel} from '../models/Link.model';

const router = Router();

router.get('/:code', async (request: Request<{code: string}>, response: Response) => {
	const code = request.params.code;
	const link: ILinkModel = await Link.findOne({code});

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

export default router;
