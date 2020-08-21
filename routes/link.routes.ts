import {Router, Response, Request} from 'express';
import {check, validationResult} from 'express-validator';
import {generate} from 'shortid';

import Link, {ILinkModel} from '../models/Link.model';
import authMiddleware from '../middleware/auth.middleware';


const router = Router();
router.use(authMiddleware);

router.post('/generate', [check('url', 'Invalid URL').isURL()],
	async (request: Request<{}, {}, {url: string}>, response: Response) => {
	try{
		const errors = validationResult(request);

		if(!errors.isEmpty())
			return response.status(422).json({message: 'Incorrect data', errors: errors.array()});

		const {url: from} = request.body;

		let link: ILinkModel = await Link.findOne({from});

		if(link)
			return response.json({link});

		const code = generate();
		const to = `${process.env.URI}/t/${code}`;

		link = new Link({owner: request['user'].userID, from, to, code});
		await link.save();

		return response.json({link});
	}
	catch(e){
		response.status(500).json({
			message: 'Something went wrong'
		})
	}
});

router.get('/', async (request: Request, response: Response) => {
	try{
		const links: Array<ILinkModel> = await Link.find({owner: request['user'].userID});
		response.json({links});
	}
	catch(e){
		response.status(500).json({
			message: 'Something went wrong'
		})
	}
});

router.get('/:id', async (request: Request<{id: string}>, response: Response) => {
	try{
		const link: ILinkModel = await Link.findOne({_id: request.params.id, owner: request['user'].userID});

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

router.delete('/:id', async (request: Request, response: Response) => {
	try{
		const link: ILinkModel = await Link.findOne({
			_id: request.params.id,
			owner: request['user'].userID
		});

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

export default router;
