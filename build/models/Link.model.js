"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    date: { type: Date, "default": Date.now },
    visitions: [{ date: { type: Date, "default": Date.now }, ip: { type: String } }],
    owner: { type: mongoose_1.Types.ObjectId, ref: 'User' }
});
exports["default"] = mongoose_1.model('Link', schema);
