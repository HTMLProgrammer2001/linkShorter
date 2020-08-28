"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var authMiddleware = function (request, response, next) {
    if (request.method === 'OPTIONS')
        return next();
    try {
        var token = request.headers.authorization.split(' ')[1];
        if (!token) {
            response.status(401).json({
                message: 'You are not authorized'
            });
            return;
        }
        var decoded = jsonwebtoken_1.verify(token, process.env.JWT_SECRET);
        request['user'] = decoded;
        next();
    }
    catch (e) {
        response.status(403).json({ message: 'You are not authorized' });
    }
};
exports["default"] = authMiddleware;
