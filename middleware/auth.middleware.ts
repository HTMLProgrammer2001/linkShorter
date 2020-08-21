import {verify} from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';


const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
	if(request.method === 'OPTIONS')
		return next();

	try{
		const token: string = request.headers.authorization.split(' ')[1];

		if(!token) {
			response.status(401).json({
				message: 'You are not authorized'
			});

			return;
		}

		const decoded: {userID: Types.ObjectId} = <any>verify(token, process.env.JWT_SECRET);

		request['user'] = decoded;
		next();
	}
	catch(e){
		response.status(403).json({message: 'You are not authorized'});
	}
};

export default authMiddleware;
