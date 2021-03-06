"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var bcrypt = __importStar(require("bcryptjs"));
var express_validator_1 = require("express-validator");
var jsonwebtoken_1 = require("jsonwebtoken");
var shortid_1 = require("shortid");
var User_model_1 = __importDefault(require("../models/User.model"));
var mail_1 = __importDefault(require("../services/mail"));
var authRouter = express_1.Router();
authRouter.post('/register', [
    express_validator_1.check('email', 'Incorrect email').isEmail(),
    express_validator_1.check('password', 'Minimum password length is 6 symbols').isLength({ min: 6 })
], function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, candidate, salt, hashedPassword, user, confirmLink, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                errors = express_validator_1.validationResult(request);
                if (!errors.isEmpty())
                    return [2 /*return*/, response.status(422).json({
                            errors: errors.array(),
                            message: 'Incorrect data'
                        })];
                _a = request.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_model_1["default"].findOne({ email: email })];
            case 1:
                candidate = _b.sent();
                if (candidate)
                    return [2 /*return*/, response.status(400).json({ message: 'User with this email exists' })];
                return [4 /*yield*/, bcrypt.genSalt(+process.env.SALT)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt.hash(password, salt)];
            case 3:
                hashedPassword = _b.sent();
                user = new User_model_1["default"]({ email: email, password: hashedPassword, confirm: shortid_1.generate() });
                return [4 /*yield*/, user.save()];
            case 4:
                _b.sent();
                confirmLink = "localhost:3000/confirm/" + user.confirm;
                return [4 /*yield*/, mail_1["default"].send({
                        to: user.email,
                        subject: 'Account confirmation',
                        html: "Check link to confirm your account: <a href=\"" + confirmLink + "\">Confirm</a>"
                    })];
            case 5:
                _b.sent();
                response.status(200).json({ message: 'User created, check your email to activate' });
                return [3 /*break*/, 7];
            case 6:
                e_1 = _b.sent();
                console.log(e_1);
                response.status(500).json({
                    message: 'Something went wrong'
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
authRouter.post('/login', [
    express_validator_1.check('email', 'Incorrect email').normalizeEmail().isEmail(),
    express_validator_1.check('password', 'Enter password').exists()
], function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, user, isMatch, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = express_validator_1.validationResult(request);
                if (!errors.isEmpty())
                    return [2 /*return*/, response.status(422).json({ message: 'Incorrect data', errors: errors.array() })];
                _a = request.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_model_1["default"].findOne({ email: email, confirm: null })];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, response.status(404).json({ message: 'This user are not registered or activated' })];
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch)
                    return [2 /*return*/, response.status(422).json({ message: 'Wrong password' })];
                token = jsonwebtoken_1.sign({
                    userID: user.id
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });
                return [2 /*return*/, response.json({
                        token: token,
                        userID: user.id
                    })];
        }
    });
}); });
authRouter.get('/confirm/:code', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var code, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = request.params.code;
                return [4 /*yield*/, User_model_1["default"].findOne({ confirm: code })];
            case 1:
                user = _a.sent();
                //not found this user
                if (!user || !code)
                    return [2 /*return*/, response.status(404).json({
                            message: 'No found'
                        })];
                //verify user
                user.confirm = null;
                user.save();
                return [2 /*return*/, response.status(200).json({
                        message: 'Email confirmed'
                    })];
        }
    });
}); });
exports["default"] = authRouter;
