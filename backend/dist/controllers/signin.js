"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const user_1 = require("../models/user");
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username) {
        return res.status(411).json({ message: 'Username is required' });
    }
    if (!password) {
        return res.status(411).json({ message: 'Password is required' });
    }
    const response = yield user_1.UserModel.findOne({ username: username });
    if ((response === null || response === void 0 ? void 0 : response.username) == username && (response === null || response === void 0 ? void 0 : response.password) == password) {
        const user = { response };
        const generateToken = jsonwebtoken_1.default.sign(user, config_1.jwt_secret, {
            expiresIn: "36000m"
        });
        return res.status(200).json({ message: "Login Successful", response, generateToken });
    }
    else {
        res.status(400).json({ message: "Invalid credentials" });
    }
});
exports.signin = signin;
