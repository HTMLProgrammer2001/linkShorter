const jwt = require('jsonwebtoken');


module.exports = (request, response, next) => {
	if(request.method === 'OPTIONS')
		return next();

	try{
		const token = request.headers.authorization.split(' ')[1];

		if(!token) {
			response.status(401).json({
				message: 'You are not authorized'
			});

			return;
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		request.user = decoded;
		next();
	}
	catch(e){
		response.status(403).json({message: 'You are not authorized'});
	}
};
